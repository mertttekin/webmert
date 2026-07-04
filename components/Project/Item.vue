<template>
    <article
        class="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
        <!-- Browser-style live preview -->
        <a :href="data.url" target="_blank" rel="noopener" class="block">
            <div class="flex items-center gap-2 border-b border-white/5 bg-ink-900/90 px-4 py-2.5">
                <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
                <span
                    class="ml-2 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center font-mono text-[11px] text-zinc-500">
                    {{ displayUrl }}
                </span>
                <Icon name="tabler:external-link" size="14"
                    class="shrink-0 text-zinc-500 transition-colors group-hover:text-accent" />
            </div>
            <div class="relative aspect-video overflow-hidden bg-ink-800">
                <img v-if="data.showImages" :src="`/img-projects/${data.imgMain}`" :alt="data.projectName"
                    class="h-full w-full object-cover object-top" loading="lazy" />
                <div v-else-if="previewFailed"
                    class="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-ink-800 to-ink-900">
                    <Icon name="tabler:world-off" size="28" class="text-zinc-600" />
                    <p class="font-display text-lg font-semibold text-zinc-400">{{ data.projectName }}</p>
                    <p class="font-mono text-[11px] text-zinc-500">preview_unavailable</p>
                </div>
                <iframe v-else :src="data.url" class="preview-frame" loading="lazy" tabindex="-1"
                    :title="`${data.projectName} preview`" scrolling="no"></iframe>
            </div>
        </a>

        <!-- Details -->
        <div class="flex flex-1 flex-col p-5 sm:p-6">
            <div class="flex items-start justify-between gap-3">
                <h3 class="font-display text-lg font-semibold text-white transition-colors group-hover:text-accent sm:text-xl">
                    {{ data.projectName }}
                </h3>
                <span class="mt-0.5 shrink-0 rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-zinc-400">
                    {{ data.companyName }}
                </span>
            </div>
            <p class="mt-1 font-mono text-xs text-zinc-500">{{ data.myRole }}</p>

            <ul class="mt-4 flex-1 space-y-1.5">
                <li v-for="line in data.description" :key="line" class="flex gap-2 text-sm leading-relaxed text-zinc-400">
                    <span class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/60"></span>
                    {{ line }}
                </li>
            </ul>

            <a :href="data.url" target="_blank" rel="noopener"
                class="mt-5 inline-flex items-center gap-1.5 self-start font-mono text-xs text-accent transition-colors hover:text-accent-dim">
                visit_site
                <Icon name="tabler:arrow-up-right" size="14" />
            </a>
        </div>
    </article>
</template>

<script setup>
const props = defineProps({
    data: { type: Object, required: true },
})

const displayUrl = computed(() =>
    props.data.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
)

// Live previews render in an iframe; when the site is gone the frame just
// shows a browser error page. Probe reachability from the visitor's browser
// (no-cors — an opaque response still means "reachable") and fall back to a
// placeholder when the request errors out.
const previewFailed = ref(false)

onMounted(async () => {
    if (props.data.showImages) return
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 6000)
    try {
        await fetch(props.data.url, { mode: 'no-cors', signal: controller.signal })
    } catch {
        previewFailed.value = true
    } finally {
        clearTimeout(timer)
    }
})
</script>
