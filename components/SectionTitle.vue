<template>
    <div v-reveal class="mb-12 sm:mb-16">
        <p class="mb-3 font-mono text-xs tracking-widest text-accent sm:text-sm">
            <span class="text-zinc-600">{{ index }}</span> // {{ label }}
        </p>
        <h2 class="font-display text-3xl font-semibold text-white sm:text-5xl">
            {{ title }}
        </h2>
        <p v-if="subtitle" class="mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
            {{ subtitle }}
        </p>
    </div>
</template>

<script setup>
defineProps({
    index: { type: String, required: true },
    label: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
})
</script>
