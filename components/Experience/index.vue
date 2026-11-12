<template>
    <section id="experience" class="section-y scroll-mt-[88px]" data-tone="coral">
        <div class="container-x">
            <SectionTitle title="Work Experience" subtitle="Where I've worked and what I've built along the way." />

            <div class="grid-cols-site">
                <!-- Sticky year (desktop) -->
                <div class="hidden lg:col-span-4 lg:block" aria-hidden="true">
                    <div class="sticky top-[112px]">
                        <p class="t-display-year text-ink">
                            <ExperienceYearRoller :value="String(years[active])" />
                        </p>
                        <p class="t-meta mt-4 text-ink-2">{{ jobs[active].company }}</p>
                    </div>
                </div>

                <ol ref="list" class="col-span-4 border-t border-line md:col-span-8 lg:col-span-7 lg:col-start-6">
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

onBeforeUnmount(() => io?.disconnect())
</script>
