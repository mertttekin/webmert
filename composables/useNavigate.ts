export const useNavigate = () =>{
    const scrollAction = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop;
            const scrollOptions: ScrollToOptions = {
                top: offsetTop,
                behavior: 'smooth', // Use 'smooth' instead of 'string'
              };
    
            setTimeout(() => {
                window.scrollTo(scrollOptions);
            }, 100); // Adjust the delay as needed
        }
    }
    const scrollToSection = (sectionId: string, routeName:string) => {
        if (routeName != "") {
            navigateTo("/")
            setTimeout(() => {
                scrollAction(sectionId)
            }, 300);
        }
        else (
            scrollAction(sectionId)
        )
    };
    
    return {scrollToSection};
}