<template>
    <div>
        <Navbar/>
        <slot />
        <Footer/>
    </div>
</template>

<script setup>
    useHead({
        htmlAttrs: {
            class: 'overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400'
        },
        title: 'Mert Tekin'
    })
</script>
