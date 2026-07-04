<template>
    <section class="mx-auto max-w-6xl px-5 sm:px-6">
        <div class="grid items-center gap-12 py-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-20">
            <!-- Left: intro -->
            <div>
                <div class="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-4">
                    <img src="https://avatars.githubusercontent.com/u/32420405?v=4" alt="Mert Tekin" width="28"
                        height="28" fetchpriority="high" class="h-7 w-7 rounded-full" />
                    <span class="relative flex h-2 w-2">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60"></span>
                        <span class="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                    </span>
                    <span class="text-xs text-zinc-300 sm:text-sm">Currently building at Huawei</span>
                </div>

                <h1 class="animate-fade-up mt-7 font-display text-4xl font-semibold leading-[1.1] text-white [animation-delay:100ms] sm:text-6xl lg:text-7xl">
                    Mert Tekin<span class="text-accent">.</span><br />
                    <span class="text-zinc-500">I build things</span><br />
                    for the web.
                </h1>

                <p class="animate-fade-up mt-6 max-w-lg text-base leading-relaxed text-zinc-400 [animation-delay:200ms] sm:text-lg">
                    Software engineer at <span class="text-zinc-200">Huawei</span>, focused on crafting fast,
                    accessible and pixel-perfect web experiences with Vue, Nuxt and modern tooling.
                </p>

                <div class="animate-fade-up mt-9 flex flex-wrap items-center gap-4 [animation-delay:300ms]">
                    <NuxtLink to="/project"
                        class="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-dim">
                        View Projects
                        <Icon name="tabler:arrow-right" size="18"
                            class="transition-transform group-hover:translate-x-1" />
                    </NuxtLink>
                    <a href="/MertTekinCV.pdf" target="_blank"
                        class="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-accent/50 hover:text-accent">
                        <Icon name="tabler:download" size="18" />
                        Download CV
                    </a>
                </div>

                <dl class="animate-fade-up mt-12 flex gap-10 border-t border-white/5 pt-8 [animation-delay:400ms] sm:gap-14">
                    <div v-for="stat in stats" :key="stat.label">
                        <dt class="order-last mt-1 text-xs text-zinc-500 sm:text-sm">{{ stat.label }}</dt>
                        <dd class="font-display text-2xl font-semibold text-white sm:text-3xl">{{ stat.value }}</dd>
                    </div>
                </dl>
            </div>

            <!-- Right: terminal card -->
            <div class="animate-fade-up [animation-delay:250ms]">
                <div class="overflow-hidden rounded-xl border border-white/10 bg-ink-900/80 shadow-2xl shadow-black/50 backdrop-blur">
                    <div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                        <span class="h-3 w-3 rounded-full bg-[#ff5f57]"></span>
                        <span class="h-3 w-3 rounded-full bg-[#febc2e]"></span>
                        <span class="h-3 w-3 rounded-full bg-[#28c840]"></span>
                        <span class="ml-3 font-mono text-xs text-zinc-500">mert@dev ~ zsh</span>
                    </div>
                    <div class="p-5 font-mono text-[13px] leading-7 sm:text-sm">
                        <p><span class="text-accent">➜</span> <span class="text-sky-400">~</span> <span class="text-zinc-300">cat mert.config.ts</span></p>
                        <p class="text-zinc-500">export default <span class="text-zinc-300">{</span></p>
                        <p class="pl-5"><span class="text-sky-300">name</span><span class="text-zinc-500">:</span> <span class="text-amber-200">'Mert Tekin'</span><span class="text-zinc-500">,</span></p>
                        <p class="pl-5"><span class="text-sky-300">role</span><span class="text-zinc-500">:</span> <span class="text-amber-200">'Software Engineer'</span><span class="text-zinc-500">,</span></p>
                        <p class="pl-5"><span class="text-sky-300">company</span><span class="text-zinc-500">:</span> <span class="text-amber-200">'Huawei'</span><span class="text-zinc-500">,</span></p>
                        <p class="pl-5"><span class="text-sky-300">stack</span><span class="text-zinc-500">:</span> <span class="text-zinc-300">[</span><span class="text-amber-200">'Vue'</span><span class="text-zinc-500">,</span> <span class="text-amber-200">'Nuxt'</span><span class="text-zinc-500">,</span> <span class="text-amber-200">'Python'</span><span class="text-zinc-300">]</span><span class="text-zinc-500">,</span></p>
                        <p class="pl-5"><span class="text-sky-300">passion</span><span class="text-zinc-500">:</span> <span class="text-amber-200">'clean UI &amp; performance'</span><span class="text-zinc-500">,</span></p>
                        <p class="pl-5"><span class="text-sky-300">coffee</span><span class="text-zinc-500">:</span> <span class="text-violet-400">Infinity</span><span class="text-zinc-500">,</span></p>
                        <p class="text-zinc-300">}</p>
                        <p class="mt-1"><span class="text-accent">➜</span> <span class="text-sky-400">~</span> <span class="animate-blink text-zinc-300">▍</span></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const stats = [
    { value: '5+', label: 'Years experience' },
    { value: '13+', label: 'Projects shipped' },
    { value: '4', label: 'Companies' },
]
</script>
