<template>
    <div ref="host" class="louver" :style="{ '--n-d': slats, '--n-m': slatsMobile }" aria-hidden="true">
        <div class="louver-stage container-x">
            <div class="louver-meta t-meta">
                <span>{{ index }}</span>
                <span class="louver-meta-rule"></span>
                <span>{{ caption }}</span>
            </div>
            <div class="louver-wall">
                <div v-for="i in slats" :key="i" class="louver-slat" :style="{ '--i': i - 1 }">
                    <div class="louver-face is-front" :data-tone="from">
                        <span class="louver-text" :data-text="label"></span>
                    </div>
                    <div class="louver-face is-back" :data-tone="to">
                        <span class="louver-text" :data-text="label"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * Louver Gate: the section transition. A wall of vertical slats (the same
 * slices the Time Slit engine uses) turns on its Y axis as you scroll, one
 * slat after another, flipping from the outgoing section's tone ("unexposed",
 * outlined label) to the incoming one ("exposed", solid label). Mid-turn each
 * slat dips back in Z so the wall reads as a physical object in depth.
 *
 * No JS / reduced motion: slats rest in their final, flat state.
 */
withDefaults(
    defineProps<{
        label: string
        index: string
        caption?: string
        from: string
        to: string
        slats?: number
        slatsMobile?: 6 | 8 | 10
    }>(),
    { caption: '', slats: 14, slatsMobile: 8 },
)

const host = ref<HTMLElement | null>(null)
let kill: (() => void) | undefined

onMounted(async () => {
    const m = await useMotion()
    const el = host.value
    if (!m || !el) return
    const { gsap } = m
    // Mobile hides extra slats with CSS; animate only the visible ones
    const slatEls = Array.from(el.querySelectorAll<HTMLElement>('.louver-slat')).filter(
        (s) => getComputedStyle(s).display !== 'none',
    )
    const depth = m.coarse ? 70 : 140

    el.classList.add('is-live')
    gsap.set(slatEls, { rotationY: 0, z: 0 })

    const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 35%',
            scrub: m.coarse ? true : 0.6,
        },
    })
    const each = 0.6 / Math.max(1, slatEls.length - 1)
    slatEls.forEach((s, i) => {
        tl.to(s, { keyframes: [{ rotationY: 90, z: -depth, duration: 0.5 }, { rotationY: 180, z: 0, duration: 0.5 }] }, i * each)
    })

    kill = () => {
        tl.scrollTrigger?.kill()
        tl.kill()
        el.classList.remove('is-live')
    }
})

onBeforeUnmount(() => kill?.())
</script>
