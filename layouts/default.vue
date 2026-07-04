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
    const route = useRoute()
    const siteUrl = 'https://merttekin.com'

    useHead({
        title: 'Mert Tekin — Software Engineer',
        link: [
            { rel: 'canonical', href: computed(() => siteUrl + (route.path === '/' ? '' : route.path)) },
        ],
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@graph': [
                        {
                            '@type': 'Person',
                            '@id': `${siteUrl}/#person`,
                            name: 'Mert Tekin',
                            url: siteUrl,
                            image: 'https://avatars.githubusercontent.com/u/32420405?v=4',
                            jobTitle: 'Software Engineer',
                            worksFor: {
                                '@type': 'Organization',
                                name: 'Huawei',
                                url: 'https://www.huawei.com/',
                            },
                            email: 'mailto:merttekin.bm@gmail.com',
                            address: { '@type': 'PostalAddress', addressCountry: 'TR' },
                            sameAs: [
                                'https://github.com/mertttekin',
                                'https://www.linkedin.com/in/mert-tekin3406/',
                            ],
                            knowsAbout: [
                                'Vue.js', 'Nuxt', 'TypeScript', 'JavaScript', 'Tailwind CSS',
                                'ArkTS', 'HarmonyOS', 'Python', 'Django', 'PostgreSQL',
                            ],
                        },
                        {
                            '@type': 'WebSite',
                            '@id': `${siteUrl}/#website`,
                            url: siteUrl,
                            name: 'Mert Tekin — Software Engineer',
                            description: 'Portfolio of Mert Tekin, software engineer at Huawei working on the HarmonyOS Gallery app and modern web experiences with Vue and Nuxt.',
                            publisher: { '@id': `${siteUrl}/#person` },
                            inLanguage: 'en',
                        },
                    ],
                }),
            },
        ],
    })
</script>
