<template>
    <section id="experience" class="mx-auto max-w-6xl scroll-mt-28 px-5 py-16 sm:px-6 sm:py-24">
        <SectionTitle index="01" label="career" title="Work Experience"
            subtitle="Where I've worked and what I've built along the way." />

        <ol class="relative ml-2 space-y-12 border-l border-white/10 sm:ml-4">
            <li v-for="(job, i) in jobs" :key="job.company + job.period" v-reveal="i * 80" class="relative pl-8 sm:pl-12">
                <!-- Timeline dot -->
                <span class="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ring-4 ring-ink-950"
                    :class="i === 0 ? 'bg-accent' : 'bg-zinc-600'"></span>

                <p class="font-mono text-xs text-zinc-500 sm:text-sm">{{ job.period }}</p>
                <h3 class="mt-1.5 font-display text-xl font-semibold text-white sm:text-2xl">
                    {{ job.role }}
                    <span class="text-zinc-500">@</span>
                    <a v-if="job.url" :href="job.url" target="_blank" rel="noopener"
                        class="text-accent transition-colors hover:text-accent-dim">{{ job.company }}</a>
                    <span v-else class="text-accent">{{ job.company }}</span>
                </h3>
                <p class="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {{ job.description }}
                </p>
                <ul v-if="job.tags?.length" class="mt-4 flex flex-wrap gap-2">
                    <li v-for="tag in job.tags" :key="tag"
                        class="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-zinc-400">
                        {{ tag }}
                    </li>
                </ul>
            </li>
        </ol>
    </section>
</template>

<script setup>
const jobs = [
    {
        role: 'Software Engineer',
        company: 'Huawei',
        url: 'https://www.huawei.com/',
        period: '2025 — Present',
        description:
            "Building the Gallery app, a core part of HarmonyOS's multimedia experience — crafting fast, fluid photo and video features with ArkTS for devices across the ecosystem. Also working on performance optimization for DevEco Studio, Huawei's IDE for HarmonyOS, improving speed and efficiency for developers.",
        tags: ['IDE Performance', 'HarmonyOS', 'ArkTS', 'Multimedia'],
    },
    {
        role: 'Front-end Developer',
        company: 'NGSI',
        url: 'https://www.linkedin.com/company/ngsi-next-gen-solution-innovation/',
        period: 'May 2023 — Oct 2024',
        description:
            'Specialized in front-end development with Nuxt 3, building dynamic, server-side rendered interfaces. Developed online ordering systems and QR code-based table ordering menus — optimizing UX, integrating backend APIs and keeping performance high across devices.',
        tags: ['Nuxt 3', 'Pinia', 'Tailwind CSS', 'i18n'],
    },
    {
        role: 'Front-end Web Developer',
        company: 'Weeb Group',
        url: 'https://weebgroup.com/',
        period: 'Jan 2023 — Apr 2023',
        description:
            'Developed and shipped website features for corporate clients such as LG, Bulut Makina and UniqConsult using HTML, CSS and JavaScript.',
        tags: ['HTML', 'CSS', 'JavaScript'],
    },
    {
        role: 'Software Development Specialist',
        company: 'Aksiyon Teknoloji',
        url: 'https://www.aksiyonteknoloji.com/',
        period: 'Aug 2021 — Dec 2022',
        description:
            'Installed and commissioned image processing software and resolved issues remotely. Worked on RS485 Modbus RTU serial communication with Python (PySerial, Tkinter, PyQt5), built a desktop app that detects disconnected cameras and notifies users instantly, and developed a Django web app for managing technical support requests.',
        tags: ['Python', 'Django', 'PyQt5', 'Modbus RTU'],
    },
    {
        role: 'Freelance Software Developer',
        company: 'Independent',
        url: '',
        period: 'Jan 2018 — Jan 2020',
        description:
            'Built web applications and scripts for online game platforms; designed logos, banners and sliders for websites.',
        tags: ['Web', 'Scripting', 'Design'],
    },
]
</script>
