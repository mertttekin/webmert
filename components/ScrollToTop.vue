<template>
    <div @click="scrollTo" v-if="isOnTop"
        class="fixed bottom-4 left-4 w-16 h-16 rounded-full bg-gradient-to-l from-blue-700 via-purple-500 to-pink-500 justify-center items-center flex opacity-50 hover:opacity-100 cursor-pointer">
        <Icon name="tabler:circle-arrow-up-filled" class="w-2/3 h-2/3" />
    </div>
</template>


<script setup>

const isOnTop = ref(false);

function scrollTo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const scrollHandler = () => {
    if (isOnTop.value && window?.scrollY < 100) {
        isOnTop.value = false;
    } else if (window?.scrollY > 50) {
        isOnTop.value = true;
    }
};

onMounted(async () => {
    await nextTick();
    document.addEventListener("scroll", scrollHandler);
});

onBeforeUnmount(() => {
    document.removeEventListener("scroll", scrollHandler);
});
</script>