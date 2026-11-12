import type { gsap as GSAP } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'

export interface MotionApi {
    gsap: typeof GSAP
    ScrollTrigger: typeof ScrollTriggerType
    lenis: Lenis | null
    coarse: boolean
    /** Reactive: may flip to true after the first-2s frame-time probe */
    lowPower: Ref<boolean>
}

export interface MotionFlags {
    reduced: boolean
    coarse: boolean
}

/** z-index scale (kept in sync with tailwind.config.js `zIndex`) */
export const Z = { content: 0, cursor: 40, nav: 50, menu: 60, shutter: 70 } as const

/** Nav height + breathing room used for anchor scrolling */
export const NAV_OFFSET = 88

/**
 * Resolves with GSAP/ScrollTrigger/Lenis once the client motion plugin has
 * lazily loaded them, or with `null` on the server / under reduced motion.
 */
export const useMotion = (): Promise<MotionApi | null> => {
    if (import.meta.server) return Promise.resolve(null)
    const nuxtApp = useNuxtApp()
    return (nuxtApp.$motion as Promise<MotionApi | null> | undefined) ?? Promise.resolve(null)
}

export const useMotionFlags = (): MotionFlags => {
    if (import.meta.server) return { reduced: false, coarse: false }
    return {
        reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        coarse: window.matchMedia('(pointer: coarse), (max-width: 767px)').matches,
    }
}

/** True only while the very first (server-rendered) page is hydrating. */
export const useIsHardLoad = (): boolean => {
    if (import.meta.server) return true
    return useNuxtApp().isHydrating === true
}

/** Waits until `ms` after navigation start (used to let the CSS intro finish). */
export const waitUntil = (ms: number) =>
    new Promise<void>((resolve) => {
        const left = ms - performance.now()
        if (left <= 0) resolve()
        else setTimeout(resolve, left)
    })
