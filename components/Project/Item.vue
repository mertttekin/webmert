<script setup>
const props = defineProps(["data", "odd"]);
</script>

<template>
    <!-- Project START -->
    <div class="text-white h-[50vh] lg:h-[65vh] hidden md:block mb-6">
        <div class="max-w-8xl mx-auto flex xl:space-x-12" :class="!odd && 'flex-row-reverse'">
            <div class="xl:flex-[5] flex-1">
                <div id="laptop" class="relative hidden md:block lg:max-h-[650px] min-w-[320px] bg-white pl-32">
                    <img class="absolute lg:max-h-[650px] max-h-[450px] min-w-[320px]" src="~/assets/img/laptop.png"
                        alt="laptop">
                    <iframe v-if="!data.showImages" id="scaled-frame"
                        class="absolute lg:w-[1490px] lg:h-[944px] lg:left-64 lg:top-8 z-20 w-[1110px] h-[724px] left-56 top-5"
                        :src="data.url" frameborder="0"></iframe>
                    <div v-else id="scaled-frame"
                        class="absolute lg:w-[1490px] lg:h-[944px] lg:left-64 lg:top-8 z-20 w-[1110px] h-[724px] left-56 top-5">
                        <img class="w-full h-full object-center object-caontain" :src="`img-projects/${data.imgMain}`"
                            alt="">
                    </div>
                </div>
                <div id="phone" class="relative hidden md:block z-20 max-h-[450px] min-w-[320px] bg-white">
                    <img class="absolute max-h-[450px] min-w-[320px]" src="~/assets/img/phone.png" alt="phone">
                    <iframe v-if="!data.showImages" id="scaled-frame"
                        class="absolute w-[420px] h-[824px] left-14 top-3 rounded-4xl z-20" :src="data.url"
                        frameborder="0"></iframe>
                    <div v-else id="scaled-frame"
                        class="absolute w-[420px] h-[824px] left-14 top-3 rounded-4xl z-20 overflow-hidden">
                        <img class="w-full h-full object-center object-caontain" :src="`img-projects/${data.imgMobil}`"
                            alt="">
                    </div>
                </div>
            </div>
            <div class="flex-1 hidden xs:block sm:hidden xl:block pr-1 text-sm ">
                <div
                    class="bg-gradient-to-l from-slate-800 via-transparent to-transparent border border-white p-5 rounded-lg space-y-5 shadow-lg shadow-white flex flex-col items-start text-start">
                    <span class="font-bold text-start">Project Name <br> <span class="text-gray-400 text-xs">{{
                        data.projectName }}</span> </span>
                    <span class="font-bold text-start">Campany Name <br> <span class="text-gray-400 text-xs">{{
                        data.companyName }}</span> </span>
                    <span class="font-bold text-start">My Role <br> <span class="text-gray-400 text-xs">{{ data.myRole
                            }}</span> </span>
                    <span class="font-bold text-start">Description <br> </span>
                    <ul class="list-disc px-2">
                        <li v-for="description in data.description" :key="description" class="text-gray-400 text-xs">{{
                            description }}
                        </li>
                    </ul>
                    <nuxt-link :to="data.url" target="_blank" class="font-bold text-start text-blue-400"> <br> {{
                        data.url }} </nuxt-link>
                </div>
            </div>
        </div>
    </div>
    <!-- MOBİL START -->
    <div class=" justify-center pb-20">
        <div class="md:hidden w-[100%] mx-auto relative min-w-[370px] max-w-[370px]">
            <img src="~/assets/img/phone.png" class="h-[70vh] mx-auto min-w-[370px] max-w-[370px]" alt="phone 2"><img>
            <iframe v-if="!data.showImages"
                class="absolute w-[87%] scale-75 h-[122%] -top-[13%] z-10 left-[50%] -translate-x-[50%] rounded-4xl"
                :src="data.url" frameborder="0"></iframe>
            <div v-else
                class="absolute w-[87%] scale-75 h-[122%] -top-[13%] z-10 left-[50%] -translate-x-[50%] rounded-4xl overflow-hidden">
                <img class="w-full h-full object-ceter object-cover" :src="`img-projects/${data.imgMobil}`" alt="">
            </div>
        </div>
        <div class="xl:hidden w-[1px] bg-white h-20 mx-auto">
        </div>
        <div class="text-white mx-10 mb-10 xl:hidden">
            <div
                class="bg-gradient-to-l from-slate-800 via-transparent to-transparent border border-white p-5 rounded-lg space-y-1 shadow-xl shadow-white flex flex-col items-start">
                <span class="font-bold text-start">Project Name <br> <span class="text-gray-400 text-xs">{{
                    data.projectName }}</span> </span>
                <span class="font-bold text-start">Campany Name <br> <span class="text-gray-400 text-xs">{{
                    data.companyName }}</span> </span>
                <span class="font-bold text-start">My Role <br> <span class="text-gray-400 text-xs">{{ data.myRole
                        }}</span> </span>
                <span class="font-bold text-start">Description <br> </span>
                <ul class="list-disc px-2">
                    <li v-for="description in data.description" :key="description" class="text-gray-400 text-xs text-start">{{
                        description }}
                    </li>
                </ul>
                <nuxt-link :to="data.url" target="_blank" class="font-bold text-start text-blue-400"> <br> {{
                    data.url }} </nuxt-link>
            </div>
        </div>
    </div>
    <!-- MOBİL END -->
    <!-- Project END -->
</template>