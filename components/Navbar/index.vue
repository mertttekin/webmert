<template>
    <header class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
        :class="scrolled ? 'border-b border-white/5 bg-ink-950/80 backdrop-blur-xl' : 'bg-transparent'">
        <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-6">
            <!-- Logo -->
            <NuxtLink to="/" class="font-mono text-sm text-zinc-100 sm:text-base" @click="menuOpen = false">
                mert<span class="text-accent">.</span>tekin<span class="text-zinc-500">()</span>
            </NuxtLink>

            <!-- Desktop links -->
            <ul class="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
                <li v-for="link in links" :key="link.label">
                    <NuxtLink v-if="link.to" :to="link.to"
                        class="transition-colors hover:text-white">{{ link.label }}</NuxtLink>
                    <button v-else @click="scrollToSection(link.section, routePath)"
                        class="transition-colors hover:text-white">{{ link.label }}</button>
                </li>
            </ul>

            <div class="flex items-center gap-4">
                <div class="hidden items-center gap-4 md:flex">
                    <NuxtLink to="https://github.com/mertttekin" target="_blank" aria-label="GitHub"
                        class="text-zinc-400 transition-colors hover:text-white">
                        <Icon name="tabler:brand-github" size="20" />
                    </NuxtLink>
                    <NuxtLink to="https://www.linkedin.com/in/mert-tekin3406/" target="_blank" aria-label="LinkedIn"
                        class="text-zinc-400 transition-colors hover:text-white">
                        <Icon name="tabler:brand-linkedin" size="20" />
                    </NuxtLink>
                </div>
                <a href="/MertTekinCV.pdf" target="_blank"
                    class="hidden rounded-lg border border-white/10 px-4 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-accent/50 hover:text-accent md:block">
                    resume.pdf
                </a>

                <!-- Mobile menu button -->
                <button class="text-zinc-300 md:hidden" aria-label="Menu" @click="menuOpen = !menuOpen">
                    <Icon :name="menuOpen ? 'tabler:x' : 'tabler:menu-2'" size="24" />
                </button>
            </div>
        </nav>

        <!-- Mobile menu -->
        <div v-if="menuOpen" class="border-b border-white/5 bg-ink-950/95 backdrop-blur-xl md:hidden">
            <ul class="flex flex-col gap-1 px-5 py-4 text-sm text-zinc-300">
                <li v-for="link in links" :key="link.label">
                    <NuxtLink v-if="link.to" :to="link.to" class="block py-2.5" @click="menuOpen = false">
                        {{ link.label }}
                    </NuxtLink>
                    <button v-else class="block w-full py-2.5 text-left"
                        @click="scrollToSection(link.section, routePath); menuOpen = false">
                        {{ link.label }}
                    </button>
                </li>
                <li class="mt-2 flex items-center gap-5 border-t border-white/5 pt-4">
                    <NuxtLink to="https://github.com/mertttekin" target="_blank" aria-label="GitHub" class="text-zinc-400">
                        <Icon name="tabler:brand-github" size="22" />
                    </NuxtLink>
                    <NuxtLink to="https://www.linkedin.com/in/mert-tekin3406/" target="_blank" aria-label="LinkedIn" class="text-zinc-400">
                        <Icon name="tabler:brand-linkedin" size="22" />
                    </NuxtLink>
                    <a href="/MertTekinCV.pdf" target="_blank" class="font-mono text-xs text-accent">resume.pdf</a>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>
const route = useRoute()
const routePath = computed(() => (route.path === '/' ? '' : route.path))
const { scrollToSection } = useNavigate()

const links = [
    { label: 'Experience', section: 'experience' },
    { label: 'Skills', section: 'skills' },
    { label: 'Projects', to: '/project' },
    { label: 'About', to: '/aboutme' },
]

const menuOpen = ref(false)
const scrolled = ref(false)

const onScroll = () => {
    scrolled.value = window.scrollY > 10
}

onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
})
</script>
