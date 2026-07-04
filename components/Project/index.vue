<template>
    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <SectionTitle index="03" label="work" title="Projects"
            subtitle="Things I've built so far — feel free to explore." />

        <div class="grid gap-6 md:grid-cols-2">
            <ProjectItem v-for="(item, i) in project.projects.slice(0, shownCount)" :key="item.id" :data="item"
                v-reveal="(i % 2) * 100" />
        </div>

        <div ref="sentinel" class="mt-12 flex items-center justify-center">
            <button v-if="shownCount < project.projects.length" @click="showMore"
                class="rounded-lg border border-white/10 px-8 py-3 font-mono text-sm text-zinc-300 transition-colors hover:border-accent/50 hover:text-accent">
                show_more()
            </button>
        </div>
    </section>
</template>

<script setup>
import project from '@/data/project.json'

const shownCount = ref(4)

const showMore = () => {
    shownCount.value = Math.min(shownCount.value + 4, project.projects.length)
}

// Auto-load more as the visitor reaches the bottom of the list
const sentinel = ref(null)
let io = null

onMounted(() => {
    io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) showMore()
        })
    })
    if (sentinel.value) io.observe(sentinel.value)
})

onUnmounted(() => {
    if (io) io.disconnect()
})
</script>
