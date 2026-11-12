<template>
    <li class="py-6" @pointerenter="onEnter" @focusin="emit('focusRow', project.id)" @focusout="emit('focusRow', null)">
        <div class="mb-6 lg:hidden">
            <SlitImage :src="image" :alt="project.projectName" :width="960" :height="600" aspect="16/10" position="top"
                :img-width="960" reveal="scroll" :fallback-title="project.projectName"
                :loading="index === 0 ? 'eager' : 'lazy'" :fetchpriority="index === 0 ? 'high' : 'auto'" />
        </div>

        <h2>
            <button :id="`project-btn-${project.id}`" type="button"
                class="u-host group flex min-h-[88px] w-full items-start justify-between gap-6 text-left"
                :aria-expanded="open ? 'true' : 'false'" :aria-controls="`project-panel-${project.id}`" @click="emit('toggle')">
                <span class="min-w-0 flex-1">
                    <span class="t-display-m u-line break-any text-ink [text-wrap:balance]">{{ project.projectName }}</span>
                    <span class="t-body-s measure mt-3 block text-ink-2">{{ project.description[0] }}</span>
                </span>
                <span class="flex shrink-0 items-center gap-3 pt-2">
                    <span class="t-meta hidden text-ink-2 sm:inline">{{ project.companyName }}</span>
                    <Icon name="tabler:chevron-down" size="20"
                        class="chevron text-ink-2 transition-transform duration-[280ms] ease-out" :class="{ 'rotate-180': open }" />
                </span>
            </button>
        </h2>

        <div :id="`project-panel-${project.id}`" class="panel" :class="{ 'is-open': open }" role="region"
            :aria-labelledby="`project-btn-${project.id}`" :inert="!open || undefined">
            <div class="overflow-hidden">
                <div class="pt-6">
                    <p class="t-meta text-ink-2"><span class="sm:hidden">{{ project.companyName }} / </span>{{ project.myRole }}</p>
                    <ul class="mt-4 space-y-2">
                        <li v-for="line in project.description" :key="line" class="t-body-s measure flex gap-3 text-ink-2">
                            <span class="mt-[0.6em] h-1 w-1 shrink-0 bg-ink-3" aria-hidden="true"></span>
                            {{ line }}
                        </li>
                    </ul>
                    <a :href="project.url" target="_blank" rel="noopener"
                        class="t-meta mt-6 inline-flex min-h-[44px] items-center gap-1.5 text-accent-strong">
                        <span class="u-line">Visit site</span>
                        <Icon name="tabler:arrow-up-right" size="16" />
                    </a>
                </div>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
import type { Project } from '~/composables/useProjects'

const props = defineProps<{ project: Project; index: number; open: boolean }>()
const emit = defineEmits<{ toggle: []; hover: [id: number]; focusRow: [id: number | null] }>()

const image = computed(() => projectImage(props.project))

const onEnter = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' || e.pointerType === 'pen') emit('hover', props.project.id)
}
</script>
