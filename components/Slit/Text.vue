<template>
    <component :is="as" ref="host" class="slit-host slit-text" :class="introClass">
        <span class="slit-real block">{{ text }}</span>
        <span class="slit-layer" :class="`m-${slicesMobile}`" :style="{ '--n-d': slices, '--n-m': slicesMobile }"
            aria-hidden="true">
            <span v-for="i in slices" :key="i" class="slit" :style="sliceStyle(i - 1)">
                <span class="slit-inner" :data-text="text"></span>
            </span>
            <span class="slit-lead"></span>
        </span>
    </component>
</template>

<script setup lang="ts">
import type { SlitSource } from '~/composables/useTimeSignal'
import { applyLiteSlices } from '~/composables/useTimeSignal'

const props = withDefaults(
    defineProps<{
        text: string
        as?: 'h1' | 'h2' | 'a' | 'span'
        slices?: number
        slicesMobile?: 6 | 8 | 10
        source?: SlitSource
        touchDrag?: boolean
        stepMs?: [number, number]
        gain?: number
        maxShiftEm?: number
        intro?: 'hero' | 'short' | false
    }>(),
    {
        as: 'span',
        slices: 12,
        slicesMobile: 8,
        source: 'scroll',
        touchDrag: false,
        stepMs: () => [20, 32],
        gain: 0.6,
        maxShiftEm: 0.14,
        intro: false,
    },
)

const host = ref<HTMLElement | null>(null)

// The CSS intro only runs on the server-rendered first paint, never on client navigation
const runIntro = props.intro && useIsHardLoad() ? props.intro : false
const introClass = ref(runIntro ? `intro-${runIntro}` : '')

const sliceStyle = (i: number) => ({
    '--i': i,
    '--from': `${((i % 2 === 0 ? 1 : -1) * (0.35 - i * 0.008)).toFixed(3)}em`,
})

let stopLite: (() => void) | undefined
onBeforeUnmount(() => stopLite?.())

useTimeSignal({
    host,
    source: props.source,
    touchDrag: props.touchDrag,
    stepMs: props.stepMs,
    gain: props.gain,
    maxShift: (el) => parseFloat(getComputedStyle(el).fontSize) * props.maxShiftEm,
    readyAt: runIntro === 'hero' ? 1600 : runIntro === 'short' ? 800 : 0,
    onReady: (m) => {
        introClass.value = ''
        stopLite = watch(
            m.lowPower,
            (lite) => {
                if (lite) applyLiteSlices(host.value?.querySelector<HTMLElement>(':scope > .slit-layer'))
            },
            { immediate: true },
        )
    },
})
</script>
