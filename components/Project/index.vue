<template>
    <section class="pb-[clamp(96px,14vw,192px)] pt-32">
        <div class="container-x">
            <SectionTitle title="Projects" as="h1" intro="short" subtitle="Things I've built so far - feel free to explore.">
                <p class="t-meta mt-4 text-ink-3">{{ projects.length }} projects</p>
            </SectionTitle>

            <div class="grid-cols-site">
                <ul class="col-span-4 divide-y divide-line border-y border-line md:col-span-8 lg:col-span-7"
                    @pointerleave="hovered = null">
                    <ProjectRow v-for="(item, i) in projects" :key="item.id" :project="item" :index="i"
                        :open="openIds.has(item.id)" @toggle="toggle(item.id)" @hover="hovered = $event"
                        @focus-row="focused = $event" />
                </ul>

                <div class="hidden lg:col-span-5 lg:col-start-8 lg:block">
                    <ProjectPreview :project="preview" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const projects = PROJECTS

const openIds = ref(new Set<number>())
const lastOpened = ref<number | null>(null)
const hovered = ref<number | null>(null)
const focused = ref<number | null>(null)

const toggle = (id: number) => {
    const next = new Set(openIds.value)
    if (next.has(id)) {
        next.delete(id)
        if (lastOpened.value === id) lastOpened.value = [...next].pop() ?? null
    } else {
        next.add(id)
        lastOpened.value = id
    }
    openIds.value = next
}

const preview = computed(() => {
    const id = hovered.value ?? focused.value ?? lastOpened.value ?? projects[0].id
    return projects.find((p) => p.id === id) ?? projects[0]
})
</script>
