<template>
    <div
        class="md:flex max-w-7xl xl:mx-auto border border-white rounded-3xl shadow-xl cardShadow backdrop-blur-sm bg-opacity-30 mx-8">
        <div class="flex-[2] flex items-center">
            <p class="text-white px-10 pt-10 text-sm sm:text-2xl xl:text-3xl font-dmSans opacity-75">
                I am always in pursuit of new opportunities,
                projects, and partnerships. Exchanging ideas about
                technology, software development, and innovation
                is a great source of excitement for me.
                By continually expanding my knowledge and
                experience, I aim to contribute to the world
                of technology with creative solutions.
            </p>
        </div>
        <div class="flex-1 p-10 overflow-hidden">
            <div class="lg:h-[60vh] flex items-center">
                <div class="relative mx-auto ">
                    <img src="~/assets/img/aboutme.jpg" alt="Your Image" class="w-full h-auto rounded-3xl blur-none z-10 max-w-[200px] sm:min-w-[320px]">
                    <div
                        class="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent via-transparent to-[#191919] opacity-100 ">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .cardShadow{
        animation: shadowAnimation 5s infinite;
    }

    @keyframes shadowAnimation {
    0% {
        box-shadow: 0px 0px 40px rgba(255, 255, 255, 1);
    }
    50% {
        box-shadow: 0px 0px 40px #540fb1;
    }
    100% {
        box-shadow: 0px 0px 40px rgba(255, 255, 255, 1);
    }
}
</style>