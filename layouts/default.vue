<template>
    <div class="relative min-h-screen bg-bg font-sans text-ink">
        <!-- Scroll sentinels: nav background (24px) and scroll-to-top (1.5 viewports) -->
        <div id="nav-sentinel" class="pointer-events-none absolute left-0 top-0 h-6 w-px" aria-hidden="true"></div>
        <div id="fold-sentinel" class="pointer-events-none absolute left-0 top-0 h-[150vh] w-px" aria-hidden="true"></div>

        <Navbar />
        <main>
            <slot />
        </main>
        <Footer />

        <SlitCursor />
        <PageShutter />
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
