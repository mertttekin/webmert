<template>
    <div ref="host" class="slit-host slit-image relative overflow-hidden bg-surface-2" :class="[introClass, toneClass]"
        :style="hostStyle" :data-slit-image="showImage ? '' : undefined">
        <template v-if="showImage">
            <img ref="img" class="slit-real absolute inset-0 h-full w-full object-cover"
                :class="[position === 'top' ? 'object-top' : 'object-center', fade ? 'slit-fade' : '', loaded ? 'is-loaded' : '']"
                :src="url" :alt="alt" :width="width" :height="height" :loading="loading"
                :fetchpriority="fetchpriority" decoding="async" @load="onLoad" @error="onError" />
            <div class="slit-layer" :class="`m-${slicesMobile}`" :style="{ '--n-d': slices, '--n-m': slicesMobile }"
                aria-hidden="true">
                <span v-for="i in slices" :key="i" class="slit" :style="{ '--i': i - 1 }">
                    <span class="slit-inner"></span>
                </span>
                <span class="slit-lead"></span>
            </div>
        </template>
        <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
            <Icon name="tabler:photo-off" size="24" class="text-ink-3" />
            <p v-if="fallbackTitle" class="t-display-m break-any text-ink-3">{{ fallbackTitle }}</p>
            <p class="t-micro text-ink-2">Preview unavailable</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MotionApi } from '~/composables/useMotion'
import { applyLiteSlices } from '~/composables/useTimeSignal'

const props = withDefaults(
    defineProps<{
        src?: string
        alt: string
        width: number
        height: number
        aspect?: string
        slices?: number
        slicesMobile?: 6 | 8 | 10
        loading?: 'lazy' | 'eager'
        fetchpriority?: 'high' | 'low' | 'auto'
        /** 'scroll' = drop-in on first viewport entry, 'intro' = CSS drop-in on hard load */
        reveal?: 'scroll' | 'intro' | false
        fallbackTitle?: string
        position?: 'top' | 'center'
        /** Width modifier for the optimised image (also used by the slices) */
        imgWidth?: number
        tone?: 'color' | 'gray' | 'gray-hover'
    }>(),
    {
        src: '',
        aspect: '16/10',
        slices: 16,
        slicesMobile: 8,
        loading: 'lazy',
        fetchpriority: 'auto',
        reveal: false,
        fallbackTitle: '',
        position: 'center',
        imgWidth: 960,
        tone: 'color',
    },
)

const $img = useImage()
const host = ref<HTMLElement | null>(null)
const img = ref<HTMLImageElement | null>(null)
const failed = ref(false)
const loaded = ref(false)

const showImage = computed(() => !!props.src && !failed.value)
const url = computed(() =>
    props.src ? $img(props.src, { width: props.imgWidth, format: 'webp', quality: 80 }) : '',
)
// Lazy images fade in (only under JS, see .slit-fade); eager ones paint as soon as they arrive
const fade = props.loading === 'lazy'

const runIntro = props.reveal === 'intro' && useIsHardLoad()
const introClass = ref(runIntro ? 'intro-drop' : '')
const toneClass = computed(() =>
    props.tone === 'gray' ? 'grayscale' : props.tone === 'gray-hover' ? 'slit-gray-hover' : '',
)

const bgVar = (u: string) => `url("${u}")`
const hostStyle = computed(() => ({
    aspectRatio: props.aspect,
    '--slit-pos': props.position === 'top' ? 'center top' : 'center',
    // Eager images may paint slices from the server render (hero intro); lazy ones get it after load
    ...(props.loading === 'eager' && url.value ? { '--slit-bg': bgVar(url.value) } : {}),
}))

let resolveLoaded: () => void = () => {}
const loadedPromise = new Promise<void>((r) => (resolveLoaded = r))

const onLoad = () => {
    loaded.value = true
    host.value?.style.setProperty('--slit-bg', bgVar(url.value))
    resolveLoaded()
}
const onError = () => {
    failed.value = true
    resolveLoaded()
}

let dropping = false
let stopLite: (() => void) | undefined
let trigger: { kill: () => void } | null = null
let tween: { kill: () => void } | null = null

const visibleSlices = () =>
    Array.from(host.value?.querySelectorAll<HTMLElement>(':scope > .slit-layer > .slit') ?? []).filter(
        (s) => s.offsetParent !== null,
    )

const setupDrop = (m: MotionApi) => {
    const el = host.value
    if (!el || props.reveal !== 'scroll' || m.lowPower.value) return
    if (el.getBoundingClientRect().top <= window.innerHeight) return
    const slices = visibleSlices()
    if (!slices.length) return
    dropping = true
    el.classList.add('is-dropping')
    m.gsap.set(slices, { yPercent: -101 })
    trigger = m.ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: async () => {
            await loadedPromise
            if (failed.value || !host.value) return
            await img.value?.decode?.().catch(() => {})
            tween = m.gsap.to(slices, {
                yPercent: 0,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.03,
                onComplete: () => {
                    dropping = false
                    host.value?.classList.remove('is-dropping')
                    m.gsap.set(slices, { clearProps: 'transform' })
                },
            })
        },
    })
}

onMounted(() => {
    const el = img.value
    if (el?.complete) {
        if (el.naturalWidth > 0) onLoad()
        else if (el.currentSrc || el.src) onError()
    }
})

onBeforeUnmount(() => {
    stopLite?.()
    trigger?.kill()
    tween?.kill()
})

useTimeSignal({
    host,
    source: 'pointer+scroll',
    stepMs: [18, 30],
    gain: 0.7,
    maxShift: (el) => el.getBoundingClientRect().height * 0.06,
    readyAt: runIntro ? 1250 : 0,
    enabled: () => !dropping && loaded.value,
    onReady: (m) => {
        introClass.value = ''
        stopLite = watch(
            m.lowPower,
            (lite) => {
                if (lite) applyLiteSlices(host.value?.querySelector<HTMLElement>(':scope > .slit-layer'))
            },
            { immediate: true },
        )
        setupDrop(m)
    },
})
</script>
