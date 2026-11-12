<template>
    <button type="button" class="inline-flex h-11 w-11 items-center justify-center text-ink-2 transition-colors duration-[180ms] hover:text-ink"
        :aria-label="label" @click="toggle">
        <Icon v-if="mounted && theme === 'dark'" name="tabler:sun" size="20" />
        <Icon v-else-if="mounted" name="tabler:moon" size="20" />
        <span v-else class="block h-5 w-5" aria-hidden="true"></span>
    </button>
</template>

<script setup lang="ts">
const theme = useTheme()
const mounted = ref(false)

const label = computed(() =>
    !mounted.value ? 'Switch theme' : theme.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
)

const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', theme.value)
    try {
        localStorage.setItem('theme', theme.value)
    } catch {
        /* storage unavailable: the choice just won't persist */
    }
}

onMounted(() => {
    mounted.value = true
})
</script>
