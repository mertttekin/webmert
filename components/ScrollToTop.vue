<template>
    <button v-if="visible" @click="scrollTo" aria-label="Scroll to top"
        class="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-ink-900/90 text-zinc-400 backdrop-blur transition-colors hover:border-accent/50 hover:text-accent">
        <Icon name="tabler:arrow-up" size="20" />
    </button>
</template>

<script setup>
const visible = ref(false)

function scrollTo() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollHandler = () => {
    visible.value = window.scrollY > 300
}

onMounted(async () => {
    await nextTick()
    document.addEventListener('scroll', scrollHandler, { passive: true })
})

onBeforeUnmount(() => {
    document.removeEventListener('scroll', scrollHandler)
})
</script>
