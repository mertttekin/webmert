<template>
    <footer id="contact" data-tone="emerald" class="scroll-mt-[88px] pb-8 pt-[clamp(96px,14vw,192px)]">
        <div class="container-x">
            <div class="grid-cols-site">
                <div class="col-span-4 md:col-span-8 lg:col-span-10">
                    <h2 class="t-display-l text-ink">
                        Have a project in mind?<br />
                        <span class="text-ink-2">Let's build it together.</span>
                    </h2>
                    <p class="t-body-l measure mt-6 text-ink-2">
                        I'm always up for collaborations, side projects and good conversations about technology.
                    </p>
                </div>
            </div>

            <div class="mt-16 flex flex-col items-start gap-4 lg:mt-24">
                <SlitText :text="SOCIAL.email" as="a" :href="`mailto:${SOCIAL.email}`" :slices="16" :slices-mobile="10"
                    source="scroll" :step-ms="[18, 30]" :gain="0.6" :max-shift-em="0.14"
                    class="footer-email u-line max-w-full text-ink" />
                <button v-if="canCopy" type="button" class="btn btn-secondary btn-sm t-meta h-11" @click="copy">
                    <Icon :name="copied ? 'tabler:check' : 'tabler:copy'" size="16" />
                    <span aria-live="polite">{{ copied ? 'Copied' : 'Copy' }}</span>
                </button>
            </div>

            <ul class="mt-12 flex flex-wrap gap-x-6 gap-y-2">
                <li>
                    <a :href="SOCIAL.phoneHref" class="contact-link">
                        <Icon name="tabler:phone" size="20" />{{ SOCIAL.phoneLabel }}
                    </a>
                </li>
                <li>
                    <a :href="SOCIAL.github" target="_blank" rel="noopener" class="contact-link">
                        <Icon name="tabler:brand-github" size="20" />GitHub
                    </a>
                </li>
                <li>
                    <a :href="SOCIAL.linkedin" target="_blank" rel="noopener" class="contact-link">
                        <Icon name="tabler:brand-linkedin" size="20" />LinkedIn
                    </a>
                </li>
                <li>
                    <a :href="SOCIAL.cv" target="_blank" rel="noopener" class="contact-link">
                        <Icon name="tabler:file-cv" size="20" />resume.pdf
                    </a>
                </li>
            </ul>

            <!-- Plain link list; also the no-JS target of the mobile menu button -->
            <nav id="site-nav-fallback" aria-label="Footer" class="mt-16">
                <ul class="flex flex-wrap gap-x-6">
                    <li v-for="link in links" :key="link.label">
                        <NuxtLink :to="link.to ?? (link.everywhere ? `#${link.section}` : `/#${link.section}`)"
                            class="t-meta inline-flex min-h-[44px] items-center text-ink-2 hover:text-ink">{{ link.label }}</NuxtLink>
                    </li>
                </ul>
            </nav>

            <div class="mt-8 flex flex-col gap-2 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
                <p class="t-micro text-ink-3">© {{ year }} Mert Tekin</p>
                <p class="t-micro text-ink-3">Designed &amp; built with Nuxt + Tailwind</p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const links = SITE_LINKS
// SSR value is baked at generate time; refreshed after hydration (no mismatch)
const year = ref(new Date().getFullYear())

const canCopy = ref(false)
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

const copy = async () => {
    try {
        await navigator.clipboard.writeText(SOCIAL.email)
        copied.value = true
        clearTimeout(timer)
        timer = setTimeout(() => (copied.value = false), 1600)
    } catch {
        /* permission denied: leave the label as is */
    }
}

onMounted(() => {
    year.value = new Date().getFullYear()
    canCopy.value = !!navigator.clipboard?.writeText && window.isSecureContext
})
onBeforeUnmount(() => clearTimeout(timer))
</script>
