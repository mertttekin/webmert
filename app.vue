<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  htmlAttrs: {
    class: 'overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400'
  }
})
</script>