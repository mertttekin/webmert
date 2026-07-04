<template>
    <div class="relative min-h-screen overflow-x-clip bg-ink-950 font-sans text-zinc-200">
        <!-- Background decorations -->
        <div class="pointer-events-none absolute inset-0 z-0">
            <div class="bg-grid absolute inset-x-0 top-0 h-[120vh]"></div>
            <div class="absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-[160px]"></div>
        </div>

        <div class="relative z-10">
            <Navbar />
            <main class="pt-24 sm:pt-28">
                <slot />
            </main>
            <Footer />
        </div>
    </div>
</template>

<script setup>
    useHead({
        title: 'Mert Tekin — Software Engineer',
    })
</script>
