<template>
    <section ref="section" class="section-y" data-tone="ice" data-h="left">
        <div class="container-x">
            <SectionTitle title="Featured Projects" subtitle="A selection of things I've built along the way." />

            <div ref="row" class="work-viewport">
                <ul ref="track" class="work-grid">
                    <li v-for="(item, i) in featured" :key="item.id" class="work-item" :class="i % 2 ? 'is-right' : 'is-left'">
                        <a :href="item.url" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true" class="work-media block">
                            <SlitImage :src="projectImage(item)" :alt="item.projectName" :width="960" :height="600" aspect="16/10"
                                position="top" :img-width="960" reveal="scroll" :fallback-title="item.projectName" />
                        </a>
                        <h3 class="mt-5">
                            <a :href="item.url" target="_blank" rel="noopener" class="t-display-m u-line break-any text-ink">{{ item.projectName }}</a>
                        </h3>
                        <p class="t-meta mt-3 text-ink-2">{{ item.companyName }} / {{ item.myRole }}</p>
                        <p class="t-body-s measure mt-3 line-clamp-2 text-ink-2">{{ item.description[0] }}</p>
                    </li>
                </ul>
            </div>

            <div class="mt-24">
                <UiButton to="/project" variant="secondary">
                    View Projects
                    <Icon name="tabler:arrow-right" size="18" />
                </UiButton>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const featured = PROJECTS.slice(0, 4)

const section = ref<HTMLElement | null>(null)
const row = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
let revert: (() => void) | null = null

/**
 * The cards become a horizontal track laid out right-to-left; the row
 * pins and scroll slides it from left to right (opposite of Experience).
 * The card closest to the centre comes forward (scale 1), the rest sit back,
 * and each image pushes in slightly: details approach the screen.
 */
onMounted(async () => {
    const m = await useMotion()
    if (!m || !section.value || !row.value || !track.value) return
    const { gsap } = m
    const mm = gsap.matchMedia()

    mm.add('(min-width: 0px)', () => {
        const el = track.value!
        const vp = row.value!
        const cards = Array.from(el.querySelectorAll<HTMLElement>('.work-item'))
        section.value!.classList.add('is-h')
        const dist = () => Math.max(0, el.scrollWidth - vp.clientWidth)
        const focus = () => {
            const mid = window.innerWidth / 2
            for (const c of cards) {
                const r = c.getBoundingClientRect()
                const d = Math.min(1, Math.abs(r.left + r.width / 2 - mid) / (window.innerWidth * 0.55))
                c.style.setProperty('--focus', (1 - d).toFixed(3))
            }
        }
        const tween = gsap.fromTo(
            el,
            { x: () => -dist() },
            {
                x: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: vp,
                    start: 'center 52%',
                    end: () => '+=' + dist() * 1.15,
                    pin: true,
                    scrub: 0.6,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: focus,
                    onRefresh: focus,
                },
            },
        )
        focus()
        return () => {
            tween.scrollTrigger?.kill()
            tween.kill()
            gsap.set(el, { clearProps: 'transform' })
            cards.forEach((c) => c.style.removeProperty('--focus'))
            section.value?.classList.remove('is-h')
        }
    })


    revert = () => mm.revert()
})

onBeforeUnmount(() => revert?.())
</script>
