<template>
    <section ref="section" class="hero relative" data-tone="emerald" aria-label="Introduction">
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
        // Zoom-in: the hero pins while the portrait travels to the centre and
        // grows until it fills the screen; the rest of the hero slides away left.
        mm.add('(min-width: 1024px)', () => {
            const p = portrait.value!
            const geo = () => {
                const s = section.value!.getBoundingClientRect()
                const r = p.getBoundingClientRect()
                const top = r.top - s.top
                return {
                    scale: Math.max(window.innerWidth / r.width, window.innerHeight / r.height) * 1.04,
                    x: window.innerWidth / 2 - (r.left + r.width / 2),
                    y: window.innerHeight / 2 - (top + r.height / 2),
                }
            }
            let g = geo()
            const tl = m.gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: section.value,
                    start: 'top top',
                    end: '+=110%',
                    pin: true,
                    scrub: 0.6,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onRefreshInit: () => {
                        m.gsap.set(p, { clearProps: 'transform' })
                        g = geo()
                    },
                },
            })
            p.classList.add('is-zooming')
            tl.to(content.value!.querySelectorAll(':scope > :not(.hero-portrait)'), { xPercent: -18, opacity: 0, stagger: 0.04, duration: 0.6 }, 0)
                .to(p, { x: () => g.x, y: () => g.y, scale: () => g.scale, duration: 1 }, 0)
                .to(p, { '--zoom-dim': 1, duration: 0.3 }, 0.75)
            return () => p.classList.remove('is-zooming')
        })
    }, section.value)
    revert = () => ctx.revert()
})

onBeforeUnmount(() => revert?.())
</script>
