<template>
    <section id="skills" class="mx-auto max-w-6xl scroll-mt-28 px-5 py-16 sm:px-6 sm:py-24">
        <SectionTitle index="02" label="tech stack" title="Skills &amp; Tools"
            subtitle="Technologies I use to bring ideas to life." />

        <div class="space-y-10">
            <div v-for="(group, gi) in groups" :key="group.name" v-reveal="gi * 100">
                <h3 class="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-500">{{ group.name }}</h3>
                <ul class="flex flex-wrap gap-3">
                    <li v-for="skill in group.skills" :key="skill.name"
                        class="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.06]">
                        <Icon :name="skill.icon" size="22" />
                        <span class="text-sm text-zinc-300 transition-colors group-hover:text-white">{{ skill.name }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup>
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
</script>
