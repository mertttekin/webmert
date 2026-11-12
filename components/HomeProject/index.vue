<template>
    <section ref="section" class="section-y">
        <div class="container-x">
            <SectionTitle title="Featured Projects" subtitle="A selection of things I've built along the way." />

            <ul class="work-grid">
                <li v-for="(item, i) in featured" :key="item.id" class="work-item" :class="i % 2 ? 'is-right' : 'is-left'">
                    <a :href="item.url" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true" class="block">
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
let revert: (() => void) | null = null

onMounted(async () => {
    const m = await useMotion()
    if (!m || m.coarse || !section.value) return
    const ctx = m.gsap.context(() => {
        const mm = m.gsap.matchMedia()
        mm.add('(min-width: 1024px)', () => {
            // Right column drifts slightly faster for depth
            section.value!.querySelectorAll<HTMLElement>('.work-item.is-right').forEach((el) => {
                m.gsap.to(el, {
                    yPercent: -6,
                    ease: 'none',
                    scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
                })
            })
        })
    }, section.value)
    revert = () => ctx.revert()
})

onBeforeUnmount(() => revert?.())
</script>
