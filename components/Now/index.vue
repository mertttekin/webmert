<template>
    <section ref="section" class="section-y" aria-label="Now">
        <div class="container-x grid-cols-site">
            <p ref="paragraph" class="t-statement col-span-4 text-ink md:col-span-8 lg:col-span-10">
                <template v-for="(w, i) in words" :key="i"><span class="now-word" :class="w.strong ? 'font-semibold' : ''">{{ w.text }}</span>{{ w.space }}</template>
            </p>

            <dl ref="statsEl" class="col-span-4 mt-16 grid grid-cols-3 gap-[clamp(16px,4vw,48px)] md:col-span-8 lg:col-span-10">
                <div v-for="(stat, i) in stats" :key="stat.label" class="flex flex-col">
                    <dt class="t-meta order-last mt-2 text-ink-2">{{ stat.label }}</dt>
                    <dd class="t-display-m text-ink">
                        <ExperienceYearRoller :value="shown[i]" :label="stat.value" :duration="600" />
                    </dd>
                </div>
            </dl>
        </div>
    </section>
</template>

<script setup lang="ts">
import experience from '@/data/experience.json'

const statement = experience.jobs[0].statement ?? ''
const STRONG = ['Gallery app', 'HarmonyOS', 'ArkTS']

// Split on spaces server-side; key phrases are kept as one bolder token
const words = (() => {
    const out: Array<{ text: string; space: string; strong: boolean }> = []
    const tokens = statement.split(/(\s+)/)
    for (let i = 0; i < tokens.length; i += 2) {
        out.push({ text: tokens[i], space: tokens[i + 1] ?? '', strong: false })
    }
    // merge multi-word strong phrases and flag strong words
    for (const phrase of STRONG) {
        const parts = phrase.split(' ')
        for (let i = 0; i <= out.length - parts.length; i++) {
            const match = parts.every((p, k) => out[i + k].text.replace(/[^\w']/g, '').startsWith(p.replace(/[^\w']/g, '')) &&
                (k < parts.length - 1 ? out[i + k].text === p : true))
            if (match) {
                for (let k = 0; k < parts.length; k++) out[i + k].strong = true
            }
        }
    }
    return out.filter((w) => w.text.length)
})()

const stats = [
    { value: '5+', label: 'Years experience' },
    { value: '13+', label: 'Projects shipped' },
    { value: '4', label: 'Companies' },
]
const shown = ref(stats.map((s) => s.value))

const section = ref<HTMLElement | null>(null)
const paragraph = ref<HTMLElement | null>(null)
const statsEl = ref<HTMLElement | null>(null)

let revert: (() => void) | null = null
let io: IntersectionObserver | null = null

onMounted(async () => {
    const m = await useMotion()
    if (!m || !paragraph.value) return

    // Odometer: only when the stats start below the fold
    const dl = statsEl.value
    if (dl && dl.getBoundingClientRect().top > window.innerHeight) {
        shown.value = stats.map((s) => s.value.replace(/\d/g, '0'))
        io = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return
            shown.value = stats.map((s) => s.value)
            io?.disconnect()
        }, { threshold: 0.4 })
        io.observe(dl)
    }

    const ctx = m.gsap.context(() => {
        const spans = paragraph.value!.querySelectorAll<HTMLElement>('.now-word')
        m.gsap.fromTo(
            spans,
            { '--p': 0 },
            {
                '--p': 1,
                ease: 'none',
                stagger: 0.08,
                scrollTrigger: { trigger: paragraph.value, start: 'top 75%', end: 'bottom 45%', scrub: 0.6 },
            },
        )
    }, section.value!)
    revert = () => ctx.revert()
})

onBeforeUnmount(() => {
    revert?.()
    io?.disconnect()
})
</script>
