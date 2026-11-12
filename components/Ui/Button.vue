<template>
    <NuxtLink v-if="to" :to="to" :class="classes">
        <span v-if="variant === 'primary'" class="btn-slices" aria-hidden="true">
            <span v-for="i in 6" :key="i" :style="{ '--i': i - 1 }"></span>
        </span>
        <slot />
    </NuxtLink>
    <a v-else :href="href" :class="classes" :target="target" :rel="target === '_blank' ? 'noopener' : undefined">
        <span v-if="variant === 'primary'" class="btn-slices" aria-hidden="true">
            <span v-for="i in 6" :key="i" :style="{ '--i': i - 1 }"></span>
        </span>
        <slot />
    </a>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        to?: string
        href?: string
        target?: string
        variant?: 'primary' | 'secondary'
        size?: 'md' | 'sm'
    }>(),
    { to: '', href: '', target: undefined, variant: 'primary', size: 'md' },
)

const classes = computed(() => [
    'btn',
    props.variant === 'primary' ? 'btn-primary' : 'btn-secondary',
    props.size === 'sm' ? 'btn-sm t-meta' : '',
])
</script>
