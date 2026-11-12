<template>
    <section ref="section" class="hero relative" aria-label="Introduction">
        <div ref="content" class="container-x grid-cols-site hero-grid">
            <!-- Brand strip: the site's only eyebrow -->
            <div class="col-span-4 flex items-center gap-3 md:col-span-6" :class="intro ? 'intro-fade-rise' : ''"
                :style="intro ? { animationDelay: '80ms' } : undefined">
                <img src="https://avatars.githubusercontent.com/u/32420405?v=4" alt="" width="24" height="24"
                    class="h-6 w-6 shrink-0 bg-surface-2" />
                <p class="t-meta text-ink-2">Currently building at Huawei</p>
            </div>

            <h1 class="hero-name t-display-xl col-span-4 mt-8 text-ink md:col-span-8 lg:col-span-9 lg:mt-12"
                :class="intro ? 'intro-scan' : ''">
                <SlitText text="Mert" as="span" :slices="24" :slices-mobile="10" source="pointer+scroll" touch-drag
                    :step-ms="[16, 28]" :gain="0.9" :max-shift-em="0.22" intro="hero" class="whitespace-nowrap" />{{ ' ' }}<SlitText
                    text="Tekin" as="span" :slices="24" :slices-mobile="10" source="pointer+scroll" touch-drag
                    :step-ms="[16, 28]" :gain="0.9" :max-shift-em="0.22" intro="hero" class="hero-line-2 whitespace-nowrap" />
            </h1>

            <p class="t-body-l col-span-4 mt-8 max-w-[40ch] text-ink-2 md:col-span-6 lg:col-span-5"
                :class="intro ? 'intro-rise' : ''">
                Software engineer at <span class="text-ink">Huawei</span>, focused on crafting fast,
                accessible and pixel-perfect web experiences with Vue, Nuxt and modern tooling.
            </p>

            <div class="col-span-4 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:col-span-8">
                <UiButton to="/project" variant="primary" class="w-full sm:w-auto" :class="intro ? 'intro-fade-rise' : ''"
                    :style="intro ? { animationDelay: '360ms' } : undefined">
                    View Projects
                    <Icon name="tabler:arrow-right" size="18" />
                </UiButton>
                <UiButton href="/MertTekinCV.pdf" target="_blank" variant="secondary" class="w-full sm:w-auto"
                    :class="intro ? 'intro-fade-rise' : ''" :style="intro ? { animationDelay: '420ms' } : undefined">
                    <Icon name="tabler:download" size="18" />
                    Download CV
                </UiButton>
            </div>

            <div ref="portrait" class="hero-portrait hidden lg:block">
                <SlitImage src="/img/aboutme.jpg" alt="Mert Tekin" :width="720" :height="900" aspect="4/5" :slices="12"
                    :slices-mobile="8" loading="eager" fetchpriority="low" reveal="intro" :img-width="720" tone="gray" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const intro = useIsHardLoad()

const section = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const portrait = ref<HTMLElement | null>(null)

let revert: (() => void) | null = null

onMounted(async () => {
    const m = await useMotion()
    if (!m || m.coarse || !section.value) return
    const ctx = m.gsap.context(() => {
        const mm = m.gsap.matchMedia()
        mm.add('(min-width: 1024px)', () => {
            const st = { trigger: section.value, start: 'top top', end: 'bottom top', scrub: true }
            m.gsap.to(content.value, { yPercent: -12, ease: 'none', scrollTrigger: st })
            m.gsap.to(portrait.value, { yPercent: -6, ease: 'none', scrollTrigger: { ...st } })
        })
    }, section.value)
    revert = () => ctx.revert()
})

onBeforeUnmount(() => revert?.())
</script>
