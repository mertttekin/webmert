<template>
    <div v-if="enabled" ref="line" class="slit-cursor pointer-events-none fixed left-0 top-0 z-cursor w-px bg-accent-line"
        style="height: 28px; opacity: 0" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import type { MotionApi } from '~/composables/useMotion'

// Companion line next to the native cursor (the native cursor is never hidden)
const enabled = ref(false)
const line = ref<HTMLElement | null>(null)

let m: MotionApi | null = null
let px = 0
let py = 0
let x = 0
let y = 0
let h = 28
let tx = 0
let ty = 0
let th = 28
let opacity = 0
let topacity = 0
let running = false
let inside = false
const cleanups: Array<() => void> = []

const LINKS = 'a, button, [role="button"], summary, label'

const resolveTarget = (target: Element | null) => {
    const image = target?.closest<HTMLElement>('[data-slit-image]')
    if (image) {
        const r = image.getBoundingClientRect()
        tx = px
        ty = r.top
        th = r.height
        topacity = 1
        return
    }
    const link = target?.closest<HTMLElement>(LINKS)
    if (link) {
        const r = link.getBoundingClientRect()
        tx = r.left - 6
        ty = r.top
        th = r.height
        topacity = 1
        return
    }
    if (target?.closest('p, li')) {
        tx = px + 14
        ty = py - 14
        th = 28
        topacity = 0
        return
    }
    tx = px + 14
    ty = py - 14
    th = 28
    topacity = inside ? 1 : 0
}

const tick = () => {
    const k = 0.25
    x += (tx - x) * k
    y += (ty - y) * k
    h += (th - h) * k
    opacity += (topacity - opacity) * 0.3
    const el = line.value
    if (el) {
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scaleY(${(h / 28).toFixed(3)})`
        el.style.opacity = opacity.toFixed(3)
    }
    if (
        Math.abs(tx - x) < 0.1 &&
        Math.abs(ty - y) < 0.1 &&
        Math.abs(th - h) < 0.1 &&
        Math.abs(topacity - opacity) < 0.01
    ) {
        m?.gsap.ticker.remove(tick)
        running = false
    }
}

const run = () => {
    if (!running && m) {
        running = true
        m.gsap.ticker.add(tick)
    }
}

const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return
    px = e.clientX
    py = e.clientY
    if (!inside) {
        inside = true
        x = px + 14
        y = py - 14
    }
    resolveTarget(e.target as Element | null)
    run()
}
const onLeave = () => {
    inside = false
    topacity = 0
    run()
}
const onVisibility = () => {
    if (document.hidden) onLeave()
}

onMounted(async () => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const motion = await useMotion()
    if (!motion || !fine || motion.coarse || motion.lowPower.value) return
    m = motion
    enabled.value = true
    await nextTick()
    if (line.value) line.value.style.transformOrigin = 'top'
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    // Re-target while scrolling under a still pointer
    const onScroll = () => {
        if (!inside) return
        resolveTarget(document.elementFromPoint(px, py))
        run()
    }
    window.addEventListener('wheel', onScroll, { passive: true })
    cleanups.push(
        () => window.removeEventListener('pointermove', onMove),
        () => document.documentElement.removeEventListener('pointerleave', onLeave),
        () => document.removeEventListener('visibilitychange', onVisibility),
        () => window.removeEventListener('wheel', onScroll),
    )
})

onBeforeUnmount(() => {
    m?.gsap.ticker.remove(tick)
    cleanups.forEach((fn) => fn())
})
</script>
