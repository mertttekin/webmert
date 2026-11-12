/**
 * Chromatic time: every section carries a tone (`data-tone`). The tone of the
 * section crossing the middle of the viewport is mirrored on <html>, which
 * re-tints the page background and the nav accent. Works without GSAP.
 *
 * Depth dolly: with motion on (fine pointer, not low power), each section's
 * content rises out of the page plane (rotateX + translateZ) as it enters.
 */
export default defineNuxtPlugin((nuxtApp) => {
    const root = document.documentElement
    let io: IntersectionObserver | null = null
    let dollies: Array<() => void> = []

    const observeTones = () => {
        io?.disconnect()
        const sections = Array.from(document.querySelectorAll<HTMLElement>('main [data-tone], footer[data-tone]'))
        if (!sections.length) {
            delete root.dataset.tone
            return
        }
        io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) root.dataset.tone = (e.target as HTMLElement).dataset.tone
                }
            },
            { rootMargin: '-50% 0px -50% 0px' },
        )
        sections.forEach((s) => io!.observe(s))
    }

    const setupDolly = async () => {
        dollies.forEach((k) => k())
        dollies = []
        const m = await useMotion()
        if (!m || m.coarse || m.lowPower.value) return
        const { gsap } = m
        const targets = document.querySelectorAll<HTMLElement>('main section[data-tone]:not(.hero) > .container-x')
        targets.forEach((el) => {
            el.parentElement?.classList.add('has-dolly')
            const tween = gsap.fromTo(
                el,
                { rotationX: 14, z: -220, yPercent: 4, transformOrigin: '50% 0%' },
                {
                    rotationX: 0,
                    z: 0,
                    yPercent: 0,
                    ease: 'none',
                    scrollTrigger: { trigger: el.parentElement!, start: 'top bottom', end: 'top 30%', scrub: 0.5 },
                },
            )
            dollies.push(() => {
                tween.scrollTrigger?.kill()
                tween.kill()
                gsap.set(el, { clearProps: 'transform' })
            })
        })
    }

    nuxtApp.hook('page:finish', () => {
        requestAnimationFrame(() => {
            observeTones()
            setupDolly()
        })
    })
    onNuxtReady(() => {
        observeTones()
        setupDolly()
    })
})
