<template>
    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <SectionTitle index="//" label="about" title="About Me" />

        <div v-reveal class="grid items-center gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
            <div class="space-y-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
                <p>
                    I'm a software engineer who loves turning ideas into
                    <span class="text-zinc-200">fast, clean and thoughtful</span> web experiences.
                    I enjoy taking on interesting projects and collaborating with people who care about their craft.
                </p>
                <p>
                    Exchanging ideas about technology, software development and innovation is a great source of
                    excitement for me. By continually expanding my knowledge and experience, I aim to contribute
                    to the world of technology with <span class="text-zinc-200">creative solutions</span>.
                </p>
                <p class="font-mono text-sm text-zinc-500">
                    <span class="text-accent">$</span> currently_at: Huawei · based_in: Türkiye
                </p>
            </div>

            <div class="relative mx-auto w-full max-w-[320px]">
                <div class="absolute -inset-3 rounded-2xl border border-accent/20"></div>
                <img src="~/assets/img/aboutme.jpg" alt="Mert Tekin"
                    class="relative w-full rounded-2xl object-cover grayscale transition-all duration-500 hover:grayscale-0" />
            </div>
        </div>
    </section>
</template>
