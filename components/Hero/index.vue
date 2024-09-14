<template>
    <div class="sm:flex justify-between items-center max-w-7xl mx-auto h-1/2">
        <div class="flex-[2]">
            <h1 class="text-white text-4xl sm:text-4xl lg:text-6xl font-dmSans transform duration-75 px-5">
                Hi 👋, <br>
                My name is<br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-500 to-pink-500">Mert Tekin</span><br>
                I build things for web
            </h1>
        </div>
        <div class="relative">
            <div class="mx-auto m-4 sm:w-96 sm:h-96 w-64 h-64 p-2 rounded-full bg-gradient-to-t from-blue-700 via-purple-500 to-pink-500">
                <img src="https://avatars.githubusercontent.com/u/32420405?v=4" class="rounded-full " alt="Mert Tekin">
            </div>
            <a href="/MertTekin-CV.pdf" target="_blank" class="w-24 h-10 justify-center items-center flex rounded-2xl absolute bottom-0 right-0 bg-gradient-to-b from-blue-700 via-purple-500 to-pink-500 animate-bounce duration-100">
                <span class="text-sm font-dmSans font-bold">Downlaod</span>
                <Icon name="tabler:file-cv" color="black" width="20px" height="20px"/>
            </a>
        </div>
    </div>
</template>