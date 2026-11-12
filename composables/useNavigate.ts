import { NAV_OFFSET } from '~/composables/useMotion'

export const useNavigate = () => {
    const route = useRoute()
    const motion = useMotion()

    /** Smooth-scrolls to a section on the home page, or navigates to `/#id` from elsewhere. */
    const scrollToSection = async (sectionId: string) => {
        if (route.path !== '/') {
            await navigateTo({ path: '/', hash: `#${sectionId}` })
            return
        }
        const section = document.getElementById(sectionId)
        if (!section) return
        const m = await Promise.race([motion, Promise.resolve(null)])
        if (m?.lenis) {
            m.lenis.scrollTo(section, { offset: -NAV_OFFSET })
        } else {
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            const top = section.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
            window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
        }
    }

    return { scrollToSection }
}
