let shutterEl: HTMLElement | null = null

export const registerShutter = (el: HTMLElement | null) => {
    shutterEl = el
}

const columns = () => Array.from(shutterEl?.children ?? []) as HTMLElement[]

/**
 * Route transition hooks for <NuxtPage :transition>. 8 columns close from the
 * top (leave), the page swaps and scrolls to the top, columns open downwards
 * (enter). Without motion (reduced / libs not loaded) the swap is instant.
 */
export const usePageShutter = () => {
    const motion = useMotion()
    const onLeave = async (_el: Element, done: () => void) => {
        const m = await Promise.race([motion, Promise.resolve(null)])
        const cols = columns()
        if (!m || !shutterEl || !cols.length) return done()
        m.lenis?.stop()
        shutterEl.style.visibility = 'visible'
        m.gsap.killTweensOf(cols)
        m.gsap.fromTo(
            cols,
            { scaleY: 0, transformOrigin: '50% 0%' },
            {
                scaleY: 1,
                duration: 0.22,
                ease: 'power3.in',
                stagger: 0.012,
                onComplete: () => {
                    if (m.lenis) m.lenis.scrollTo(0, { immediate: true, force: true })
                    window.scrollTo(0, 0)
                    done()
                },
            },
        )
    }

    const onEnter = async (_el: Element, done: () => void) => {
        const m = await Promise.race([motion, Promise.resolve(null)])
        const cols = columns()
        if (!m || !shutterEl || !cols.length || shutterEl.style.visibility !== 'visible') return done()
        m.gsap.fromTo(
            cols,
            { scaleY: 1, transformOrigin: '50% 100%' },
            {
                scaleY: 0,
                duration: 0.22,
                ease: 'power3.out',
                stagger: 0.012,
                delay: 0.04,
                onComplete: () => {
                    if (shutterEl) shutterEl.style.visibility = 'hidden'
                    m.lenis?.start()
                    m.ScrollTrigger.refresh()
                    done()
                },
            },
        )
    }

    return { name: 'shutter', mode: 'out-in' as const, css: false, onLeave, onEnter }
}
