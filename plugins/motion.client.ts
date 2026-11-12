import type { MotionApi } from '~/composables/useMotion'
import { pushScrollVelocity } from '~/composables/useTimeSignal'

/**
 * Loads GSAP + ScrollTrigger (+ Lenis on fine pointers) lazily, after the app is
 * ready and the main thread is idle. Under reduced motion nothing is loaded.
 */
export default defineNuxtPlugin((nuxtApp) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse), (max-width: 767px)').matches
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    const lowPower = ref((navigator.hardwareConcurrency || 8) <= 4 || nav.connection?.saveData === true)

    const motion: Promise<MotionApi | null> = reduced
        ? Promise.resolve(null)
        : new Promise((resolve) => {
              onNuxtReady(() => {
                  const idle =
                      'requestIdleCallback' in window
                          ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 1500 })
                          : (cb: () => void) => setTimeout(cb, 200)
                  idle(async () => {
                      try {
                          const [{ gsap }, { ScrollTrigger }] = await Promise.all([
                              import('gsap'),
                              import('gsap/ScrollTrigger'),
                          ])
                          gsap.registerPlugin(ScrollTrigger)

                          let lenis: MotionApi['lenis'] = null
                          if (!coarse) {
                              const { default: Lenis } = await import('lenis')
                              lenis = new Lenis({ lerp: 0.1, anchors: false })
                              lenis.on('scroll', (l: { velocity: number }) => {
                                  ScrollTrigger.update()
                                  pushScrollVelocity(l.velocity)
                              })
                              gsap.ticker.add((t) => lenis!.raf(t * 1000))
                              gsap.ticker.lagSmoothing(0)
                          } else {
                              ScrollTrigger.create({
                                  start: 0,
                                  end: 'max',
                                  onUpdate: (self) => pushScrollVelocity(self.getVelocity() / 60),
                              })
                          }

                          // Frame-time probe: average frame > 22ms in the first 2s => lite mode
                          if (!lowPower.value) {
                              let frames = 0
                              let total = 0
                              const probe = (_t: number, dt: number) => {
                                  frames++
                                  total += dt
                                  if (total >= 2000) {
                                      gsap.ticker.remove(probe)
                                      if (total / frames > 22) lowPower.value = true
                                  }
                              }
                              gsap.ticker.add(probe)
                          }

                          document.documentElement.classList.add('motion-on')
                          document.fonts?.ready.then(() => ScrollTrigger.refresh())
                          resolve({ gsap, ScrollTrigger, lenis, coarse, lowPower })
                      } catch (err) {
                          console.warn('[motion] failed to load', err)
                          resolve(null)
                      }
                  })
              })
          })

    nuxtApp.hook('page:finish', () => {
        motion.then((m) => {
            if (m) requestAnimationFrame(() => m.ScrollTrigger.refresh())
        })
    })

    return {
        provide: {
            motion,
        },
    }
})
