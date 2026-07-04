<template>
    <footer id="contact" class="mt-16 border-t border-white/5">
        <div class="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
            <div v-reveal class="text-center">
                <p class="mb-3 font-mono text-xs tracking-widest text-accent sm:text-sm">
                    <span class="text-zinc-600">04</span> // contact
                </p>
                <h2 class="mx-auto max-w-2xl font-display text-3xl font-semibold text-white sm:text-5xl">
                    Have a project in mind?<br />
                    <span class="text-zinc-500">Let's build it together.</span>
                </h2>
                <p class="mx-auto mt-5 max-w-md text-sm text-zinc-400 sm:text-base">
                    I'm always up for collaborations, side projects and good conversations about technology.
                </p>

                <div class="mt-9 flex flex-wrap items-center justify-center gap-4">
                    <a href="mailto:merttekin.bm@gmail.com"
                        class="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-dim">
                        <Icon name="tabler:mail" size="18" />
                        merttekin.bm@gmail.com
                    </a>
                    <a href="tel:+905302487969"
                        class="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-accent/50 hover:text-accent">
                        <Icon name="tabler:phone" size="18" />
                        +90 530 248 79 69
                    </a>
                </div>

                <div class="mt-8 flex items-center justify-center gap-5">
                    <NuxtLink to="https://github.com/mertttekin" target="_blank" aria-label="GitHub"
                        class="text-zinc-500 transition-colors hover:text-white">
                        <Icon name="tabler:brand-github" size="24" />
                    </NuxtLink>
                    <NuxtLink to="https://www.linkedin.com/in/mert-tekin3406/" target="_blank" aria-label="LinkedIn"
                        class="text-zinc-500 transition-colors hover:text-white">
                        <Icon name="tabler:brand-linkedin" size="24" />
                    </NuxtLink>
                </div>
            </div>

            <div class="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 font-mono text-xs text-zinc-600 sm:flex-row">
                <p>© {{ new Date().getFullYear() }} Mert Tekin</p>
                <p>designed &amp; built with <span class="text-accent">Nuxt</span> + <span class="text-accent">Tailwind</span></p>
            </div>
        </div>
    </footer>
</template>
