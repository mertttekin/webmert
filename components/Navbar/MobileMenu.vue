<template>
    <div id="mobile-menu" ref="root" class="mm fixed inset-0 z-menu lg:hidden" :class="{ 'is-open': open }"
        role="dialog" aria-modal="true" aria-label="Site menu" :inert="!open || undefined" @keydown="onKeydown">
        <!-- 6 vertical panels close in from the top (Time Slit language) -->
        <div class="absolute inset-0 flex" aria-hidden="true">
            <span v-for="i in 6" :key="i" class="mm-panel h-full w-[calc(100%/6)] bg-surface" :style="{ '--i': i - 1 }"></span>
        </div>

        <div class="relative flex h-full flex-col overflow-y-auto">
            <div class="container-x flex h-16 shrink-0 items-center justify-between">
                <NuxtLink to="/" class="wordmark text-ink" aria-label="Mert Tekin, home" @click="emit('close', false)">
                    mert<span class="text-accent-strong">.</span>tekin<span class="text-ink-3">()</span>
                </NuxtLink>
                <button type="button"
                    class="t-meta -mr-2 inline-flex h-11 min-w-[44px] items-center justify-center gap-2 px-2 text-ink"
                    @click="emit('close', true)">
                    Close
                    <Icon name="tabler:x" size="20" />
                </button>
            </div>

            <nav class="container-x flex-1 pt-8" aria-label="Mobile">
                <ul>
                    <li v-for="(link, i) in links" :key="link.label" class="mm-item" :style="{ '--i': i }">
                        <a :href="hrefOf(link)" class="t-display-m flex min-h-[56px] items-center text-ink"
                            :class="{ 'first-link': i === 0 }" @click.prevent="select(link)">{{ link.label }}</a>
                    </li>
                </ul>
            </nav>

            <div class="mm-item container-x shrink-0 border-t border-line py-6" :style="{ '--i': links.length }">
                <div class="flex flex-wrap items-center gap-x-2 gap-y-2">
                    <a :href="SOCIAL.github" target="_blank" rel="noopener" aria-label="GitHub"
                        class="inline-flex h-11 w-11 items-center justify-center text-ink-2 hover:text-ink">
                        <Icon name="tabler:brand-github" size="20" />
                    </a>
                    <a :href="SOCIAL.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"
                        class="inline-flex h-11 w-11 items-center justify-center text-ink-2 hover:text-ink">
                        <Icon name="tabler:brand-linkedin" size="20" />
                    </a>
                    <a :href="SOCIAL.cv" target="_blank" rel="noopener"
                        class="t-meta inline-flex h-11 items-center px-2 text-ink-2 hover:text-ink">resume.pdf</a>
                    <ThemeToggle />
                </div>
                <a :href="`mailto:${SOCIAL.email}`" class="t-body-s break-any mt-2 inline-flex min-h-[44px] items-center text-ink-2 hover:text-ink">
                    {{ SOCIAL.email }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SiteNavLink } from '~/composables/useSiteNav'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [restoreFocus: boolean] }>()

const route = useRoute()
const { links, hrefOf, go } = useSiteNav()
const motion = useMotion()

const root = ref<HTMLElement | null>(null)

const select = async (link: SiteNavLink) => {
    emit('close', false)
    await nextTick()
    await go(link)
}

const focusables = () =>
    Array.from(
        root.value?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
    ).filter((el) => el.offsetParent !== null)

const onKeydown = (e: KeyboardEvent) => {
    if (!props.open) return
    if (e.key === 'Escape') {
        e.preventDefault()
        emit('close', true)
        return
    }
    if (e.key !== 'Tab') return
    const list = focusables()
    if (!list.length) return
    const first = list[0]
    const last = list[list.length - 1]
    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
    }
}

const lockScroll = async (lock: boolean) => {
    const m = await Promise.race([motion, Promise.resolve(null)])
    if (m?.lenis) {
        if (lock) m.lenis.stop()
        else m.lenis.start()
    }
    document.body.style.overflow = lock ? 'hidden' : ''
}

watch(
    () => props.open,
    (open) => {
        if (import.meta.server) return
        lockScroll(open)
        if (open) nextTick(() => root.value?.querySelector<HTMLElement>('.first-link')?.focus({ preventScroll: true }))
    },
)

watch(
    () => route.fullPath,
    () => {
        if (props.open) emit('close', false)
    },
)

// Growing past the mobile breakpoint hides the menu (lg:hidden): close it so the scroll lock is released
let desktopMq: MediaQueryList | null = null
const onDesktopChange = (e: MediaQueryListEvent) => {
    if (e.matches && props.open) emit('close', false)
}
onMounted(() => {
    desktopMq = window.matchMedia('(min-width: 1024px)')
    desktopMq.addEventListener('change', onDesktopChange)
})

onBeforeUnmount(() => {
    desktopMq?.removeEventListener('change', onDesktopChange)
    if (import.meta.client) document.body.style.overflow = ''
})
</script>
