<template>
    <div ref="el" class="shutter" aria-hidden="true">
        <span v-for="i in 8" :key="i"></span>
    </div>
</template>

<script setup lang="ts">
import { registerShutter } from '~/composables/usePageShutter'

const el = ref<HTMLElement | null>(null)
onMounted(() => registerShutter(el.value))
onBeforeUnmount(() => registerShutter(null))
</script>
