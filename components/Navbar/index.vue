<template>
    <header ref="header"
        class="nav-bar fixed inset-x-0 top-0 z-nav border-b transition-[transform,background-color,border-color] duration-[280ms] ease-out"
        :class="[hidden ? '-translate-y-full' : '', solid ? 'is-solid border-line' : 'border-transparent']"
        @focusin="focusInside = true" @focusout="focusInside = false">
        <nav class="container-x flex h-16 items-center justify-between gap-6 lg:h-[72px]" aria-label="Main">
            <NuxtLink to="/" class="wordmark shrink-0 text-ink" aria-label="Mert Tekin, home">
                mert<span class="text-accent-strong">.</span>tekin<span class="text-ink-3">()</span>
            </NuxtLink>

            <div class="hidden items-center gap-6 lg:flex xl:gap-8">
                <ul class="flex items-center gap-6 xl:gap-8">
                    <li v-for="(link, i) in links" :key="link.label" :class="intro ? 'intro-fade' : ''"
                        :style="intro ? { animationDelay: `${240 + i * 40}ms` } : undefined">
                        <a :href="hrefOf(link)" class="nav-link t-body-s text-ink-2 transition-colors duration-[180ms] hover:text-ink"
                            :class="{ 'is-active': isActive(link) }" :aria-current="isActive(link) && link.to ? 'page' : undefined"
                            @click.prevent="go(link)">{{ link.label }}</a>
                    </li>
                </ul>
                <div class="flex items-center" :class="intro ? 'intro-fade' : ''"
                    :style="intro ? { animationDelay: `${240 + links.length * 40}ms` } : undefined">
                    <a :href="SOCIAL.github" target="_blank" rel="noopener" aria-label="GitHub"
                        class="inline-flex h-11 w-11 items-center justify-center text-ink-2 transition-colors duration-[180ms] hover:text-ink">
                        <Icon name="tabler:brand-github" size="20" />
                    </a>
                    <a :href="SOCIAL.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"
                        class="inline-flex h-11 w-11 items-center justify-center text-ink-2 transition-colors duration-[180ms] hover:text-ink">
                        <Icon name="tabler:brand-linkedin" size="20" />
                    </a>
                    <ThemeToggle />
                    <UiButton :href="SOCIAL.cv" target="_blank" variant="secondary" size="sm" class="ml-3">resume.pdf</UiButton>
                </div>
            </div>

            <!-- Without JS this jumps to the footer link list -->
            <a ref="menuButton" href="#site-nav-fallback" role="button"
                class="t-meta -mr-2 inline-flex h-11 min-w-[44px] items-center justify-center gap-2 px-2 text-ink lg:hidden"
                :aria-expanded="menuOpen ? 'true' : 'false'" aria-controls="mobile-menu"
                @click.prevent="menuOpen = true" @keydown.space.prevent="menuOpen = true">
                Menu
                <Icon name="tabler:menu-2" size="20" />
            </a>
        </nav>
    </header>

    <NavbarMobileMenu :open="menuOpen" @close="closeMenu" />
</template>

<script setup lang="ts">
import type { SiteNavLink } from '~/composables/useSiteNav'

const route = useRoute()
const { links, hrefOf, go } = useSiteNav()

// Nav links fade in only during the home page's hard-load intro
const intro = route.path === '/' && useIsHardLoad()

const header = ref<HTMLElement | null>(null)
const menuButton = ref<HTMLElement | null>(null)
const menuOpen = ref(false)
const hidden = ref(false)
const solid = ref(false)
const focusInside = ref(false)
const activeSection = ref('')

const closeMenu = (restoreFocus = true) => {
    menuOpen.value = false
    if (restoreFocus) nextTick(() => menuButton.value?.focus())
}

const isActive = (link: SiteNavLink) => {
    if (link.to) return route.path === link.to
    if (link.everywhere) return activeSection.value === link.section
    return route.path === '/' && activeSection.value === link.section
}

watch(menuOpen, (open) => {
    if (open) hidden.value = false
})

let stopTrigger: (() => void) | null = null
let sectionIO: IntersectionObserver | null = null
let solidIO: IntersectionObserver | null = null

const observeSections = () => {
    sectionIO?.disconnect()
    activeSection.value = ''
    sectionIO = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) activeSection.value = e.target.id
                else if (activeSection.value === e.target.id) activeSection.value = ''
            })
        },
        { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['experience', 'skills', 'contact'].forEach((id) => {
        const el = document.getElementById(id)
        if (el) sectionIO!.observe(el)
    })
}

const nuxtApp = useNuxtApp()
const offPageFinish = nuxtApp.hook('page:finish', () => {
    observeSections()
})

onMounted(async () => {
    const sentinel = document.getElementById('nav-sentinel')
    if (sentinel) {
        solidIO = new IntersectionObserver(([e]) => (solid.value = !e.isIntersecting))
        solidIO.observe(sentinel)
    }
    observeSections()

    const m = await useMotion()
    if (!m) return
    const st = m.ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
            if (menuOpen.value || focusInside.value || self.scroll() < 120) {
                hidden.value = false
                return
            }
            hidden.value = self.direction === 1
        },
    })
    stopTrigger = () => st.kill()
})

onBeforeUnmount(() => {
    offPageFinish()
    stopTrigger?.()
    sectionIO?.disconnect()
    solidIO?.disconnect()
})
</script>
