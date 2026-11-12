<template>
    <section class="pb-[clamp(96px,14vw,192px)] pt-32">
        <div class="container-x">
            <SectionTitle title="About Me" as="h1" intro="short" />

            <div class="grid-cols-site gap-y-12">
                <div class="col-span-4 md:col-span-8 lg:col-span-5">
                    <div class="about-portrait w-full max-w-[420px] lg:sticky lg:top-[112px] lg:max-w-none">
                        <SlitImage src="/img/aboutme.jpg" alt="Mert Tekin" :width="720" :height="900" aspect="4/5" :slices="16"
                            :slices-mobile="8" loading="eager" fetchpriority="high" :img-width="720" tone="gray-hover" />
                    </div>
                </div>

                <div class="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
                    <div class="t-body-l measure space-y-6 text-ink-2">
                        <p>
                            I'm a software engineer who loves turning ideas into
                            <span class="text-ink">fast, clean and thoughtful</span> web experiences.
                            I enjoy taking on interesting projects and collaborating with people who care about their craft.
                        </p>
                        <p>
                            Exchanging ideas about technology, software development and innovation is a great source of
                            excitement for me. By continually expanding my knowledge and experience, I aim to contribute
                            to the world of technology with <span class="text-ink">creative solutions</span>.
                        </p>
                    </div>

                    <dl class="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 sm:max-w-md">
                        <div>
                            <dt class="t-meta text-ink-3">Currently at</dt>
                            <dd class="t-body mt-1 text-ink">Huawei</dd>
                        </div>
                        <div>
                            <dt class="t-meta text-ink-3">Based in</dt>
                            <dd class="t-body mt-1 text-ink">Türkiye</dd>
                        </div>
                    </dl>

                    <div class="mt-10">
                        <UiButton href="/MertTekinCV.pdf" target="_blank" variant="secondary">
                            <Icon name="tabler:download" size="18" />
                            Download CV
                        </UiButton>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
