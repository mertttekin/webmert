const NAV_OFFSET = 96; // height of the fixed navbar + breathing room

export const useNavigate = () => {
    const scrollAction = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const top = section.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
            setTimeout(() => {
                window.scrollTo({ top, behavior: "smooth" });
            }, 100);
        }
    };

    const scrollToSection = (sectionId: string, routeName: string) => {
        if (routeName != "") {
            navigateTo("/");
            setTimeout(() => {
                scrollAction(sectionId);
            }, 300);
        } else {
            scrollAction(sectionId);
        }
    };

    return { scrollToSection };
};
