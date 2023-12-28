
<template>

        <h2 class="text-white text-center font-quicksand text-4xl p-10 ">My Projects</h2>
        <ProjectItem class="space-y-32" v-for="item in project.projects" :key="item.id" :data="item" :odd="item.id % 2 !== 0"/>

</template>

<script setup>
import project from "@/data/project.json"

</script>