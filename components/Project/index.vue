
<template>

        <h1 class="text-white text-center font-quicksand text-4xl p-10 ">My Projects</h1>
        <ProjectItem class="space-y-32" v-for="item in project.projeler" :key="item.id" :data="item" :odd="item.id % 2 !== 0"/>

</template>

<script setup>
import project from "@/data/project.json"

</script>