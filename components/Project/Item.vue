<script setup>
    const props = defineProps(["data", "odd"]);
</script>

<template>
    <!-- Project START -->
    <div class="text-white h-[50vh] lg:h-[65vh] hidden md:block">
        <div class="max-w-8xl mx-auto flex xl:space-x-12" :class="!odd && 'flex-row-reverse'">
            <div class="xl:flex-[5] flex-1">
                <div id="laptop" class="relative hidden md:block lg:max-h-[650px] min-w-[320px] bg-white pl-32">
                    <img class="absolute lg:max-h-[650px] max-h-[450px] min-w-[320px]" src="~/assets/img/laptop.png" alt="laptop">
                    <iframe id="scaled-frame"
                        class="absolute lg:w-[1490px] lg:h-[944px] lg:left-64 lg:top-8 z-20 w-[1110px] h-[724px] left-56 top-5"
                        :src="data.url" frameborder="0"></iframe>
                </div>
                <div id="phone" class="relative hidden md:block z-20 max-h-[450px] min-w-[320px] bg-white">
                    <img class="absolute max-h-[450px] min-w-[320px]" src="~/assets/img/phone.png" alt="phone">
                    <iframe id="scaled-frame" class="absolute w-[420px] h-[824px] left-14 top-3 rounded-4xl z-20"
                        :src="data.url" frameborder="0"></iframe>
                </div>
            </div>
            <div class="flex-1 hidden xs:block sm:hidden xl:block pr-1 text-md">
                <div class="bg-purple-500 h-[50vh] bg-opacity-5 border border-white p-5 rounded-lg space-y-1 shadow-xl shadow-white">
                    <h1>
                        Project Name : {{ data.projectName }}
                    </h1>
                    <h2>
                        Company Name : {{ data.campanyName }}
                    </h2>
                    <h2>
                        My Role :  {{ data.myRole }}
                    </h2>
                    <p>Description :   {{ data.description }}</p>
                </div>
            </div>
        </div>
    </div>
    <!-- MOBİL START -->
    <div class=" justify-center">
        <div class="md:hidden w-[100%] mx-auto relative">
            <img src="~/assets/img/phone.png" class="h-full mx-auto " alt="phone 2"><img>
            <iframe class="absolute w-[89%] scale-75 h-[122%] -top-[13%] z-10 left-[50%] -translate-x-[50%] rounded-4xl"
                :src="data.url" frameborder="0"></iframe>
        </div>
        <div class="xl:hidden w-[1px] bg-white h-20 mx-auto">
        </div>
        <div class="text-white mx-10 mb-10 xl:hidden">
            <div class="bg-purple-500 bg-opacity-5 border border-white p-5 rounded-lg space-y-1 shadow-xl shadow-white ">
                <h1>
                        Proje Name : {{ data.projectName }}
                    </h1>
                    <h2>
                        Company Name : {{ data.campanyName }}
                    </h2>
                    <h2>
                        My Role :  {{ data.myRole }}
                    </h2>
                    <p>Description :   {{ data.description }}</p>
            </div>
        </div>
    </div>
    <!-- MOBİL END -->
    <!-- Project END -->
</template>