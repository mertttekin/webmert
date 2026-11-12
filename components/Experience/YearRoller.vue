<template>
    <span class="inline-flex whitespace-nowrap" :style="{ '--roll-dur': `${duration}ms` }">
        <span class="sr-only">{{ label ?? value }}</span>
        <span class="inline-flex" aria-hidden="true">
            <template v-for="(ch, k) in chars" :key="k">
                <span v-if="ch.digit" class="roller-digit">
                    <span class="roller-strip" :style="{ '--d': ch.d, '--k': ch.k }">
                        <span v-for="n in 10" :key="n">{{ n - 1 }}</span>
                    </span>
                </span>
                <span v-else>{{ ch.c }}</span>
            </template>
        </span>
    </span>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        /** What the strips show (may be a transient value such as "00") */
        value: string
        /** Accessible value; defaults to `value` */
        label?: string
        duration?: number
    }>(),
    { label: undefined, duration: 480 },
)

const chars = computed(() => {
    let k = 0
    return props.value.split('').map((c) => {
        const digit = /\d/.test(c)
        return { c, digit, d: digit ? Number(c) : 0, k: digit ? k++ : 0 }
    })
})
</script>
