<template>
    <section id="experience" ref="section" class="section-y scroll-mt-[88px]" data-tone="coral" data-h="right">
        <div class="container-x">
            <SectionTitle title="Work Experience" subtitle="Where I've worked and what I've built along the way." />

            <div ref="row" class="exp-row grid-cols-site">
                <!-- Sticky year (desktop) -->
                <div class="hidden lg:col-span-4 lg:block" aria-hidden="true">
                    <div class="sticky top-[112px]">
                        <p class="t-display-year text-ink">
                            <ExperienceYearRoller :value="String(years[active])" />
                        </p>
                        <p class="t-meta mt-4 text-ink-2">{{ jobs[active].company }}</p>
                    </div>
                </div>

                <div class="exp-viewport col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
                <ol ref="list" class="exp-track border-t border-line">
                    <li v-for="(job, i) in jobs" :key="job.company + job.period" :data-index="i"
                        class="job relative pt-12 lg:pt-16 [&:not(:first-child)]:mt-12 lg:[&:not(:first-child)]:mt-24 lg:pl-8"
                        :class="{ 'is-active': i === active }">
                        <span class="job-bar absolute bottom-0 left-0 top-16 hidden w-0.5 bg-accent-line lg:block" aria-hidden="true"></span>
                        <p class="t-display-m mb-4 text-ink lg:hidden">{{ years[i] }}</p>
                        <p class="t-meta text-ink-2">{{ job.period }}</p>
                        <h3 class="t-h3 mt-2 text-ink">
                            {{ job.role }} <span class="text-ink-3">@</span>
                            <a v-if="job.url" :href="job.url" target="_blank" rel="noopener"
                                class="underline decoration-1 underline-offset-4 transition-colors duration-[180ms] hover:text-accent-strong">{{ job.company }}</a>
                            <span v-else>{{ job.company }}</span>
                        </h3>
                        <p class="t-body measure mt-4 text-ink-2">{{ job.statement ? `${job.statement} ${job.description}` : job.description }}</p>
                        <p v-if="job.tags?.length" class="t-micro mt-4 text-ink-2">
                            <template v-for="(tag, k) in job.tags" :key="tag">{{ tag }}<span v-if="k < job.tags.length - 1" class="text-ink-3"> / </span></template>
                        </p>
                    </li>
                </ol>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import experience from '@/data/experience.json'

const jobs = experience.jobs
const years = jobs.map((j) => Number(/\d{4}/.exec(j.period)?.[0] ?? ''))

const active = ref(0)
const list = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null

onMounted(() => {
    if (!list.value) return
    // Active record = the one crossing 55% of the viewport height
    io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) active.value = Number((e.target as HTMLElement).dataset.index)
            })
        },
        { rootMargin: '-45% 0px -54% 0px' },
    )
    list.value.querySelectorAll('.job').forEach((el) => io!.observe(el))
})

/**
 * Desktop (>=1024, fine pointer, motion on): the job list turns into a
 * horizontal track; the row pins and vertical scroll drives it to the left,
 * so the page reads as flowing to the right. The sticky year follows progress.
 */
const section = ref<HTMLElement | null>(null)
const row = ref<HTMLElement | null>(null)
let revert: (() => void) | null = null

onMounted(async () => {
    const m = await useMotion()
    if (!m || m.coarse || !section.value || !row.value || !list.value) return
    const { gsap } = m
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
        const track = list.value!
        const viewport = track.parentElement as HTMLElement
        section.value!.classList.add('is-h')
        io?.disconnect()
        const dist = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
        const tween = gsap.to(track, {
            x: () => -dist(),
            ease: 'none',
            scrollTrigger: {
                trigger: row.value!,
                start: 'center 55%',
                end: () => '+=' + dist() * 1.1,
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    active.value = Math.min(jobs.length - 1, Math.round(self.progress * (jobs.length - 1)))
                },
            },
        })
        return () => {
            tween.scrollTrigger?.kill()
            tween.kill()
            gsap.set(track, { clearProps: 'transform' })
            section.value?.classList.remove('is-h')
        }
    })
    revert = () => mm.revert()
})

onBeforeUnmount(() => {
    io?.disconnect()
    revert?.()
})
</script>
