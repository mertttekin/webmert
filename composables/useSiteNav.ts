export interface SiteNavLink {
    label: string
    /** Section id on the home page (Experience, Skills) or on every page (Contact) */
    section?: string
    /** True when the section exists on every page (footer) */
    everywhere?: boolean
    to?: string
}

export const SITE_LINKS: SiteNavLink[] = [
    { label: 'Experience', section: 'experience' },
    { label: 'Skills', section: 'skills' },
    { label: 'Projects', to: '/project' },
    { label: 'About', to: '/aboutme' },
    { label: 'Contact', section: 'contact', everywhere: true },
]

export const SOCIAL = {
    github: 'https://github.com/mertttekin',
    linkedin: 'https://www.linkedin.com/in/mert-tekin3406/',
    email: 'merttekin.bm@gmail.com',
    phoneHref: 'tel:+905302487969',
    phoneLabel: '+90 530 248 79 69',
    cv: '/MertTekinCV.pdf',
} as const

export const useSiteNav = () => {
    const route = useRoute()
    const { scrollToSection } = useNavigate()
    // captured during setup so it can be awaited from event handlers
    const motion = useMotion()

    const hrefOf = (link: SiteNavLink) => {
        if (link.to) return link.to
        if (link.everywhere) return `#${link.section}`
        return `/#${link.section}`
    }

    const go = async (link: SiteNavLink) => {
        if (link.to) return navigateTo(link.to)
        if (link.everywhere && route.path !== '/') {
            const el = document.getElementById(link.section!)
            if (el) {
                const m = await Promise.race([motion, Promise.resolve(null)])
                if (m?.lenis) m.lenis.scrollTo(el, { offset: -NAV_OFFSET })
                else {
                    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
                }
                return
            }
        }
        return scrollToSection(link.section!)
    }

    return { links: SITE_LINKS, hrefOf, go }
}
