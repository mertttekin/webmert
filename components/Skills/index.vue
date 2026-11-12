<template>
    <section id="skills" ref="section" class="section-y scroll-mt-[88px]">
        <div class="container-x">
            <SectionTitle title="Skills & Tools" subtitle="Technologies I use to bring ideas to life." />

            <div class="space-y-16">
                <div v-for="group in groups" :key="group.name" class="grid-cols-site border-t border-line pt-8 lg:pt-10">
                    <h3 class="t-h3 col-span-4 mb-6 text-ink md:col-span-8 lg:col-span-3 lg:mb-0">{{ group.name }}</h3>
                    <ul class="skill-grid col-span-4 md:col-span-8 lg:col-span-9">
                        <li v-for="skill in group.skills" :key="skill.name" class="skill-cell t-body-s">
                            <Icon :name="skill.icon" size="20" class="skill-icon shrink-0" />
                            <span class="skill-name">{{ skill.name }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const groups = [
    {
        name: 'Frontend',
        skills: [
            { name: 'Vue.js', icon: 'logos:vue' },
            { name: 'Nuxt 3', icon: 'logos:nuxt-icon' },
            { name: 'JavaScript', icon: 'logos:javascript' },
            { name: 'TypeScript', icon: 'logos:typescript-icon' },
            { name: 'ArkTS', icon: 'simple-icons:harmonyos' },
            { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
            { name: 'Pinia', icon: 'logos:pinia' },
            { name: 'React', icon: 'logos:react' },
            { name: 'HTML', icon: 'logos:html-5' },
            { name: 'CSS', icon: 'logos:css-3' },
        ],
    },
    {
        name: 'Backend & Database',
        skills: [
            { name: 'Python', icon: 'logos:python' },
            { name: 'Django', icon: 'logos:django-icon' },
            { name: 'PostgreSQL', icon: 'logos:postgresql' },
            { name: 'MySQL', icon: 'logos:mysql-icon' },
            { name: 'SQL', icon: 'tabler:database' },
        ],
    },
    {
        name: 'Tools & Cloud',
        skills: [
            { name: 'Git', icon: 'logos:git-icon' },
            { name: 'AWS', icon: 'logos:aws' },
            { name: 'Cypress', icon: 'logos:cypress-icon' },
            { name: 'Cloudflare', icon: 'logos:cloudflare-icon' },
        ],
    },
]

const section = ref<HTMLElement | null>(null)
let revert: (() => void) | null = null

onMounted(async () => {
    const m = await useMotion()
    if (!m || !section.value) return
    const ctx = m.gsap.context(() => {
        section.value!.querySelectorAll<HTMLElement>('.skill-grid').forEach((grid) => {
            if (grid.getBoundingClientRect().top <= window.innerHeight * 0.8) return
            const cells = grid.querySelectorAll<HTMLElement>('.skill-cell')
            m.gsap.set(cells, { opacity: 0, y: 16 })
            m.ScrollTrigger.create({
                trigger: grid,
                start: 'top 80%',
                once: true,
                onEnter: () =>
                    m.gsap.to(cells, { opacity: 1, y: 0, duration: 0.52, ease: 'power3.out', stagger: 0.018, clearProps: 'transform,opacity' }),
            })
        })
    }, section.value)
    revert = () => ctx.revert()
})

onBeforeUnmount(() => revert?.())
</script>
