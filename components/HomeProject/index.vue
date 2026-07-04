<template>
    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <div class="flex items-end justify-between gap-6">
            <SectionTitle index="03" label="work" title="Featured Projects"
                subtitle="A selection of things I've built — with live previews." />
            <NuxtLink to="/project" v-reveal
                class="mb-12 hidden shrink-0 items-center gap-1.5 font-mono text-sm text-accent transition-colors hover:text-accent-dim sm:mb-16 md:inline-flex">
                view_all()
                <Icon name="tabler:arrow-right" size="16" />
            </NuxtLink>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
            <ProjectItem v-for="(item, i) in featured" :key="item.id" :data="item" v-reveal="(i % 2) * 100" />
        </div>

        <div class="mt-12 flex justify-center">
            <NuxtLink to="/project"
                class="group inline-flex items-center gap-2 rounded-lg border border-white/10 px-8 py-3 font-mono text-sm text-zinc-300 transition-colors hover:border-accent/50 hover:text-accent">
                view_all_projects()
                <Icon name="tabler:arrow-right" size="16" class="transition-transform group-hover:translate-x-1" />
            </NuxtLink>
        </div>
    </section>
</template>

<script setup>
import project from '@/data/project.json'

const featured = project.projects.slice(0, 4)
</script>
