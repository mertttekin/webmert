<template>
    <div class="font-quicksand text-white text-center my-10 sm:my-20">
        <h1 class="font-semibold sm:text-5xl text-3xl">
            Projects
        </h1>
        <h1 class="mt-4 text-[#A7A7A7]"> Things I’ve built so far</h1>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-5 font-dmSans">
            <button @click="showProject" class="bg-gradient-to-l from-blue-700 via-purple-500 to-pink-500 px-10 py-6 rounded-3xl w-[300px] ">
                <span v-if="!diplayProject" class="capitalize">
                    Show project on this page
                </span>
                <span v-else class="capitalize">
                    Close project on this page
                </span>
            </button>
            <NuxtLink :to="'/project'" class="bg-gradient-to-r from-blue-700 via-purple-500 to-pink-500 px-10 py-6 rounded-3xl w-[300px]">
                <span>
                    Go to Project Page
                </span>
            </NuxtLink>
        </div>
        <Project v-if="diplayProject"/>
    </div>
</template>

<script setup>
    const diplayProject = ref(false)
    
    function showProject() {
        diplayProject.value = !diplayProject.value
    }
</script>