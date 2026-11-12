<template>
  <div>
    <NuxtLayout>
      <NuxtPage :transition="shutter" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const theme = useTheme()
const shutter = usePageShutter()

useHead({
  meta: [
    { name: 'theme-color', content: computed(() => (theme.value === 'light' ? '#F2F4F1' : '#0B0D0C')) },
  ],
})

onMounted(() => {
  // Runs after every child mounted (Slit images already flagged their loaded state)
  document.documentElement.classList.add('hydrated')
  theme.value = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
})
</script>
