<template>
    <div class="sticky top-[112px]">
        <div class="relative overflow-hidden bg-surface-2" style="aspect-ratio: 16 / 10" data-slit-image>
            <!-- Desktop-only panel: below lg a 1px placeholder is used so mobile never downloads the 1200w image -->
            <picture v-if="shownUrl">
                <source media="(max-width: 1023.98px)"
                    srcset="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
                <img ref="base" :src="shownUrl" :alt="shown.projectName" width="1200" height="750"
                    loading="eager" decoding="async" class="absolute inset-0 h-full w-full object-cover object-top"
                    :style="{ visibility: animating ? 'hidden' : 'visible' }" />
            </picture>
            <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
                <Icon name="tabler:photo-off" size="24" class="text-ink-3" />
                <p class="t-display-m break-any text-ink-3">{{ shown.projectName }}</p>
                <p class="t-micro text-ink-2">Preview unavailable</p>
            </div>

            <div v-for="layer in ['out', 'in']" :key="layer" :ref="(el) => setLayer(layer, el)"
                class="slit-layer slit-image" style="--n-d: 16; --n-m: 16; --slit-pos: center top" aria-hidden="true">
                <span v-for="i in 16" :key="i" class="slit" :style="{ '--i': i - 1 }">
                    <span class="slit-inner"></span>
                </span>
            </div>
        </div>
        <p class="t-meta break-any mt-4 text-ink-2">{{ displayUrl(project.url) }}</p>
    </div>
</template>

<script setup lang="ts">
import type { Project } from '~/composables/useProjects'
import type { MotionApi } from '~/composables/useMotion'

const props = defineProps<{ project: Project }>()

const $img = useImage()
const urlOf = (p: Project) => {
    const src = projectImage(p)
    return src ? $img(src, { width: 1200, format: 'webp', quality: 80 }) : ''
}

// Resolve every preview URL during SSR so `nuxt generate` prerenders all of them
if (import.meta.server) PROJECTS.forEach(urlOf)

const shown = shallowRef<Project>(props.project)
const shownUrl = computed(() => urlOf(shown.value))
const animating = ref(false)
const base = ref<HTMLImageElement | null>(null)

const layers: Record<string, HTMLElement | null> = { out: null, in: null }
const setLayer = (name: string, el: unknown) => {
    layers[name] = (el as HTMLElement) ?? null
}

let m: MotionApi | null = null
let tl: { kill: () => void } | null = null
let target: Project | null = null

onMounted(async () => {
    m = await useMotion()
})

const finish = async (next: Project) => {
    shown.value = next
    await nextTick()
    await base.value?.decode?.().catch(() => {})
    animating.value = false
    for (const l of Object.values(layers)) {
        if (!l) continue
        l.style.visibility = ''
        m?.gsap.set(l.children, { clearProps: 'transform' })
    }
}

watch(
    () => props.project,
    (next) => {
        if (next.id === (target ?? shown.value).id) return
        const fromUrl = urlOf(target ?? shown.value)
        const toUrl = urlOf(next)
        if (tl) {
            tl.kill()
            tl = null
            if (target) shown.value = target
        }
        target = next
        if (!m || !fromUrl || !toUrl || !layers.out || !layers.in) {
            target = null
            animating.value = false
            shown.value = next
            return
        }
        const preload = new Image()
        preload.src = toUrl

        layers.out.style.setProperty('--slit-bg', `url("${fromUrl}")`)
        layers.in.style.setProperty('--slit-bg', `url("${toUrl}")`)
        layers.out.style.visibility = 'visible'
        layers.in.style.visibility = 'visible'
        animating.value = true

        const ease = 'power3.inOut'
        const timeline = m.gsap.timeline({
            onComplete: () => {
                tl = null
                target = null
                finish(next)
            },
        })
        timeline
            .fromTo(layers.out.children, { yPercent: 0 }, { yPercent: 101, duration: 0.42, ease, stagger: 0.014 }, 0)
            .fromTo(layers.in.children, { yPercent: -101 }, { yPercent: 0, duration: 0.42, ease, stagger: 0.014 }, 0)
        tl = timeline
    },
)

onBeforeUnmount(() => tl?.kill())
</script>
