export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("reveal", {
        mounted(el: HTMLElement, binding) {
            el.classList.add("reveal");
            if (binding.value) {
                el.style.transitionDelay = `${binding.value}ms`;
            }
            const io = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        el.classList.add("reveal-visible");
                        io.disconnect();
                    }
                },
                { threshold: 0.08 }
            );
            io.observe(el);
        },
        // No-op during SSR; the element is revealed on the client after mount
        getSSRProps() {
            return {};
        },
    });
});
