<template>
        <h2 class="text-white text-center font-quicksand text-4xl p-10">My Projects</h2>
        <ProjectItem 
            class="space-y-32" 
            v-for="item in project.projects.slice(0, ShowItemCount)" 
            :key="item.id"
            :data="item" 
            :odd="item.id % 2 !== 0" 
        />
        <div ref="observer" class="flex items-center justify-center">
            <button v-if="ShowItemCount <= project.projects.length" id="showmore" @click="ShowMore" class="border text-white font-quicksand px-10 py-4 hover:bg-gray-700 rounded">
                Show More 
            </button>
        </div>
    </template>
    
    <script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import project from "@/data/project.json";
    
    const ShowItemCount = ref(2);
    
    const ShowMore = () => {
        if (ShowItemCount.value <= project.projects.length) {
            ShowItemCount.value += 2;
        }
    };
    
    const observer = ref(null);
    
    const handleIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                ShowMore();
            }
        });
    };
    
    let intersectionObserver = null;
    
    onMounted(() => {
        intersectionObserver = new IntersectionObserver(handleIntersection);
        if (observer.value) {
            intersectionObserver.observe(observer.value);
        }
    });
    
    onUnmounted(() => {
        if (intersectionObserver) {
            intersectionObserver.disconnect();
        }
    });
    </script>
    