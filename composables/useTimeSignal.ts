import type { MotionApi } from '~/composables/useMotion'

/* ------------------------------------------------------------------ */
/* Global scroll velocity hub (fed by Lenis or ScrollTrigger)          */
/* ------------------------------------------------------------------ */
let scrollVel = 0
let scrollAt = -1e9
const scrollListeners = new Set<() => void>()

/** px per 16.67ms, positive while scrolling down */
export const pushScrollVelocity = (v: number) => {
    scrollVel = Number.isFinite(v) ? v : 0
    scrollAt = performance.now()
    scrollListeners.forEach((fn) => fn())
}
const readScrollVelocity = (now: number) => (now - scrollAt > 90 ? 0 : scrollVel)

/* ------------------------------------------------------------------ */
/* Time Slit signal                                                     */
/* ------------------------------------------------------------------ */
const WINDOW_MS = 600
const FRAME = 1000 / 60
const IDLE_MS = 200
const REST_PX = 0.3

export type SlitSource = 'pointer+scroll' | 'scroll'

export interface TimeSignalOptions {
    host: Ref<HTMLElement | null>
    source: SlitSource
    /** Listen to finger drags on the element itself (hero name) */
    touchDrag?: boolean
    stepMs: [desktop: number, mobile: number]
    gain: number
    /** Max shift in px, evaluated on wake */
    maxShift: (host: HTMLElement) => number
    /** ms after navigation start before inputs are honoured (CSS intro) */
    readyAt?: number
    /** Called once the engine is live (intro over, libs loaded) */
    onReady?: (m: MotionApi) => void
    /** Return false to temporarily ignore input (e.g. during a drop-in) */
    enabled?: () => boolean
}

/**
 * Ring-buffered, time-stamped vertical velocity. Each slice reads the signal
 * `|i - origin| * stepMs` in the past, so motion propagates across the slices.
 * Sleeps (no ticker subscription) whenever everything is at rest.
 */
export const useTimeSignal = (opts: TimeSignalOptions) => {
    const cleanups: Array<() => void> = []
    let motion: MotionApi | null = null
    let disposed = false

    // ring buffer
    const cap = 256
    const ts = new Float64Array(cap)
    const vs = new Float32Array(cap)
    let head = 0
    let count = 0

    let v = 0
    let awake = false
    let restSince = 0
    let lastTick = 0

    let pointerVel = 0
    let pointerAt = -1e9
    let lastPY = 0
    let lastPT = 0
    let originX = 0 // 0..1 within host, -1 = scroll origin
    let originAt = -1e9

    let slices: HTMLElement[] = []
    let lead: HTMLElement | null = null
    let n = 0
    let step = 16
    let max = 20
    let visible = false

    const push = (t: number, val: number) => {
        ts[head] = t
        vs[head] = val
        head = (head + 1) % cap
        if (count < cap) count++
    }

    /** linear interpolation of v at time t */
    const sample = (t: number) => {
        if (count === 0) return 0
        let newer = (head - 1 + cap) % cap
        if (t >= ts[newer]) return vs[newer]
        for (let k = 1; k < count; k++) {
            const older = (head - 1 - k + cap * 2) % cap
            if (ts[older] <= t) {
                const span = ts[newer] - ts[older] || 1
                const f = (t - ts[older]) / span
                return vs[older] + (vs[newer] - vs[older]) * f
            }
            newer = older
        }
        return 0
    }

    const measure = () => {
        const host = opts.host.value
        if (!host) return
        const layer = host.querySelector<HTMLElement>(':scope > .slit-layer')
        if (!layer) return
        const all = Array.from(layer.querySelectorAll<HTMLElement>(':scope > .slit'))
        const cssN = parseInt(getComputedStyle(layer).getPropertyValue('--n'), 10)
        n = Math.max(1, Math.min(all.length, Number.isFinite(cssN) ? cssN : all.length))
        slices = all.slice(0, n)
        lead = layer.querySelector<HTMLElement>(':scope > .slit-lead')
        const mobile = window.matchMedia('(pointer: coarse), (max-width: 767px)').matches
        step = mobile ? opts.stepMs[1] : opts.stepMs[0]
        max = opts.maxShift(host)
    }

    const tick = (_time: number, deltaTime: number) => {
        const now = performance.now()
        const dt = Math.min(64, deltaTime || now - lastTick || FRAME)
        lastTick = now

        let raw = readScrollVelocity(now)
        if (opts.source === 'pointer+scroll' || opts.touchDrag) {
            if (now - pointerAt < 60) raw += pointerVel
        }
        const alpha = 1 - Math.pow(0.75, dt / FRAME)
        v += (raw - v) * alpha
        push(now, v)

        const origin = now - originAt < 400 && originX >= 0 ? Math.min(n - 1, Math.floor(originX * n)) : 0
        let moving = false
        for (let i = 0; i < n; i++) {
            const d = Math.abs(i - origin) * step
            let y = sample(now - d) * opts.gain
            if (y > max) y = max
            else if (y < -max) y = -max
            if (Math.abs(y) >= REST_PX) moving = true
            slices[i].style.transform = `translate3d(0,${y.toFixed(2)}px,0)`
        }
        if (lead) {
            lead.style.left = `${(origin / n) * 100}%`
            lead.style.opacity = String(Math.min(1, Math.abs(v) / 12))
        }

        if (moving || Math.abs(raw) >= REST_PX) restSince = now
        else if (now - restSince > IDLE_MS) sleep()
    }

    const wake = () => {
        if (!motion || awake || disposed) return
        if (opts.enabled && !opts.enabled()) return
        const host = opts.host.value
        if (!host) return
        measure()
        if (!slices.length) return
        awake = true
        restSince = performance.now()
        lastTick = restSince
        host.classList.add('is-slitting')
        motion.gsap.ticker.add(tick)
    }

    const sleep = () => {
        if (!awake) return
        awake = false
        motion?.gsap.ticker.remove(tick)
        v = 0
        count = 0
        head = 0
        slices.forEach((s) => (s.style.transform = ''))
        if (lead) lead.style.opacity = '0'
        opts.host.value?.classList.remove('is-slitting')
    }

    const onScrollSignal = () => {
        if (visible) wake()
    }

    const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return
        const host = opts.host.value
        if (!host) return
        const now = performance.now()
        const dtp = Math.max(1, e.timeStamp - lastPT)
        if (now - pointerAt < 120) pointerVel = ((e.clientY - lastPY) / dtp) * FRAME
        else pointerVel = 0
        lastPY = e.clientY
        lastPT = e.timeStamp
        pointerAt = now
        const r = host.getBoundingClientRect()
        originX = r.width ? Math.min(0.999, Math.max(0, (e.clientX - r.left) / r.width)) : 0
        originAt = now
        wake()
    }

    const onTouchMove = (e: TouchEvent) => {
        const host = opts.host.value
        const t = e.touches[0]
        if (!host || !t) return
        const now = performance.now()
        const dtp = Math.max(1, e.timeStamp - lastPT)
        if (now - pointerAt < 120) pointerVel = ((t.clientY - lastPY) / dtp) * FRAME
        else pointerVel = 0
        lastPY = t.clientY
        lastPT = e.timeStamp
        pointerAt = now
        const r = host.getBoundingClientRect()
        originX = r.width ? Math.min(0.999, Math.max(0, (t.clientX - r.left) / r.width)) : 0
        originAt = now
        wake()
    }

    onMounted(async () => {
        const m = await useMotion()
        if (!m || disposed) return
        if (opts.readyAt) await waitUntil(opts.readyAt)
        if (disposed) return
        motion = m
        const host = opts.host.value
        if (!host) return
        opts.onReady?.(m)

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            if (visible) scrollListeners.add(onScrollSignal)
            else {
                scrollListeners.delete(onScrollSignal)
                sleep()
            }
        })
        io.observe(host)
        cleanups.push(() => io.disconnect())

        const fine = window.matchMedia('(pointer: fine)').matches
        if (opts.source === 'pointer+scroll' && fine) {
            host.addEventListener('pointermove', onPointerMove, { passive: true })
            cleanups.push(() => host.removeEventListener('pointermove', onPointerMove))
        }
        if (opts.touchDrag) {
            host.addEventListener('touchmove', onTouchMove, { passive: true })
            cleanups.push(() => host.removeEventListener('touchmove', onTouchMove))
        }
    })

    onBeforeUnmount(() => {
        disposed = true
        sleep()
        scrollListeners.delete(onScrollSignal)
        cleanups.forEach((fn) => fn())
    })

    return { wake, sleep }
}

/** Applies the low-power halving (min 6) to a slit layer at runtime. */
export const applyLiteSlices = (layer: HTMLElement | null | undefined) => {
    if (!layer) return
    const cssN = parseInt(getComputedStyle(layer).getPropertyValue('--n'), 10)
    if (!Number.isFinite(cssN)) return
    const lite = Math.max(6, Math.floor(cssN / 2))
    if (lite >= cssN) return
    layer.style.setProperty('--n', String(lite))
    Array.from(layer.children).forEach((el, i) => {
        if (el.classList.contains('slit') && i >= lite) (el as HTMLElement).style.display = 'none'
    })
}
