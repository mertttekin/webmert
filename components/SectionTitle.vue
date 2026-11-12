<template>
    <div class="section-head-gap">
        <SlitText :text="title" :as="as" :slices="12" :slices-mobile="8" source="scroll" :step-ms="[20, 32]" :gain="0.6"
            :max-shift-em="0.14" :intro="intro" class="t-display-l text-ink" />
        <p v-if="subtitle" class="t-body-l measure mt-6 text-ink-2">{{ subtitle }}</p>
        <slot />
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        title: string
        subtitle?: string
        as?: 'h1' | 'h2'
        intro?: 'short' | false
    }>(),
    { subtitle: '', as: 'h2', intro: false },
)
</script>
