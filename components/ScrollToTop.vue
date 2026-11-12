<template>
    <button type="button" aria-label="Scroll to top"
        class="fixed bottom-5 right-5 z-cursor flex h-11 w-11 items-center justify-center border border-line bg-surface text-ink-2 transition-[opacity,color,border-color] duration-[180ms] hover:border-accent-strong hover:text-accent-strong"
        :class="visible ? 'opacity-100' : 'pointer-events-none opacity-0'" :tabindex="visible ? 0 : -1"
        :aria-hidden="visible ? undefined : 'true'" @click="toTop">
        <Icon name="tabler:arrow-up" size="20" />
    </button>
</template>

<script setup lang="ts">
const motion = useMotion()
const pastFold = ref(false)
const footerInView = ref(false)
const visible = computed(() => pastFold.value && !footerInView.value)

const toTop = async () => {
    const m = await Promise.race([motion, Promise.resolve(null)])
    if (m?.lenis) m.lenis.scrollTo(0)
    else {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    }
    document.querySelector<HTMLElement>('header a')?.focus({ preventScroll: true })
}

let io: IntersectionObserver | null = null
onMounted(() => {
    const sentinel = document.getElementById('fold-sentinel')
    const footer = document.getElementById('contact')
    io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.target === sentinel) pastFold.value = !e.isIntersecting
            else footerInView.value = e.isIntersecting
        })
    })
    if (sentinel) io.observe(sentinel)
    if (footer) io.observe(footer)
})
onBeforeUnmount(() => io?.disconnect())
</script>
