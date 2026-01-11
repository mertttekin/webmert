<template>
    <div id="skills" class="font-quicksand text-white text-center my-3 sm:my-10">
        <h2 class="font-semibold sm:text-5xl text-3xl">
            My Tech Stack
        </h2>
        <h1 class="mt-4 text-[#A7A7A7]"> Technologies I’ve been working with recently</h1>
        <div class="sm:mt-16 max-w-5xl mx-auto space-y-14 sm:p-0 p-2 relative">
            <div class="absolute inset-0 gradiet animate-pulse rounded-2xl -z-10"></div>
            <div>
                <ul class="grid grid-cols-6 sm:mx-20 mx-2">
                    <!-- Vue.js -->
                    <li class="col-span-1 flex flex-col items-center justify-center">
                        <div
                            class="flex items-center justify-center lg:w-32 lg:h-32 sm:w-16 sm:h-16 w-10 h-10  bg-[#540FB1] rounded-full">
                            <svg class="absolute w-4 sm:w-6 lg:w-20 translate-y-1" xmlns="http://www.w3.org/2000/svg"
                                width="75" height="66" viewBox="0 0 75 66" fill="none">
                                <path
                                    d="M46.1602 7.62939e-06L37.5 15.2418L28.8398 7.62939e-06H0L37.5 65.9996L75 7.62939e-06H46.1602Z"
                                    fill="#41B883" />
                                <path d="M46.1602 0L37.4999 15.2418L28.8397 0H14.9999L37.4999 39.599L59.9999 0H46.1602Z"
                                    fill="#34495E" />
                            </svg>
                        </div>
                        <p class="text-white mt-2 font-semibold text-xs sm:text-lg">Vue.js</p>
                    </li>
                    <!-- Nuxt 3 -->
                    <li class="col-span-1 flex flex-col items-center justify-center">
                        <div
                            class="flex items-center justify-center lg:w-32 lg:h-32 sm:w-16 sm:h-16 w-10 h-10  bg-[#540FB1] rounded-full">
                            <svg class="absolute w-4 sm:w-6 lg:w-20" xmlns="http://www.w3.org/2000/svg" width="85"
                                height="57" viewBox="0 0 85 57" fill="none">
                                <path
                                    d="M47.6858 57H79.2838C80.2875 57.0001 81.2734 56.7368 82.1426 56.2365C83.0118 55.7361 83.7334 55.0165 84.235 54.1499C84.7366 53.2832 85.0005 52.3003 85 51.2997C84.9995 50.2992 84.7349 49.3164 84.2324 48.4502L63.0121 11.8075C62.5105 10.9411 61.7891 10.2215 60.9201 9.72125C60.0511 9.22108 59.0654 8.95765 58.0619 8.95765C57.0585 8.95765 56.0727 9.22108 55.2038 9.72125C54.3348 10.2215 53.6133 10.9411 53.1118 11.8075L47.6858 21.183L37.0771 2.84933C36.5751 1.98303 35.8533 1.26359 34.9841 0.76342C34.1148 0.26334 33.1289 0 32.1254 0C31.1218 0 30.1359 0.26334 29.2667 0.76342C28.3975 1.26359 27.6756 1.98303 27.1737 2.84933L0.767502 48.4502C0.265146 49.3164 0.000437216 50.2992 5.41146e-07 51.2997C-0.000436134 52.3003 0.263414 53.2832 0.765014 54.1499C1.26661 55.0165 1.98827 55.7361 2.85742 56.2365C3.72655 56.7368 4.71252 57.0001 5.71616 57H25.5508C33.4095 57 39.205 53.5586 43.1928 46.8446L52.8746 30.1288L58.0604 21.183L73.6239 48.0542H52.8746L47.6858 57ZM25.2274 48.045L11.3854 48.0419L32.1346 12.2157L42.4877 30.1288L35.5559 42.1016C32.9076 46.4578 29.8989 48.045 25.2274 48.045Z"
                                    fill="#00DC82" />
                            </svg>
                        </div>
                        <p class="text-white mt-2 font-semibold text-xs sm:text-lg whitespace-nowrap">Nuxt 3</p>
                    </li>
                    <!-- Git -->
                    <li class="col-span-1 flex flex-col items-center justify-center">
                        <div
                            class="flex items-center justify-center lg:w-32 lg:h-32 sm:w-16 sm:h-16 w-10 h-10  bg-[#540FB1] rounded-full">
                            <img class="absolute w-4 sm:w-6 lg:w-20" src="~/assets/img/git.png" alt="Git" />
                        </div>
                        <p class="text-white mt-2 font-semibold text-xs sm:text-lg">Git</p>
                    </li>
                    <!-- JavaScript -->
                    <li class="col-span-1 flex flex-col items-center justify-center">
                        <div
                            class="flex items-center justify-center lg:w-32 lg:h-32 sm:w-16 sm:h-16 w-10 h-10  bg-[#540FB1] rounded-full">
                            <img class="absolute w-4 sm:w-6 lg:w-20" src="~/assets/img/js.png" alt="JavaScript" />
                        </div>
                        <p class="text-white mt-2 font-semibold text-xs sm:text-lg">JavaScript</p>
                    </li>
                    <!-- HTML -->
                    <li class="col-span-1 flex flex-col items-center justify-center">
                        <div
                            class="flex items-center justify-center lg:w-32 lg:h-32 sm:w-16 sm:h-16 w-10 h-10  bg-[#540FB1] rounded-full">
                            <img class="absolute w-4 sm:w-6 lg:w-20" src="~/assets/img/html.png" alt="HTML" />
                        </div>
                        <p class="text-white mt-2 font-semibold text-xs sm:text-lg">HTML</p>
                    </li>
                    <!-- CSS -->
                    <li class="col-span-1 flex flex-col items-center justify-center">
                        <div
                            class="flex items-center justify-center lg:w-32 lg:h-32 sm:w-16 sm:h-16 w-10 h-10  bg-[#540FB1] rounded-full">
                            <img class="absolute w-4 sm:w-6 lg:w-20" src="~/assets/img/css.png" alt="CSS" />
                        </div>
                        <p class="text-white mt-2 font-semibold text-xs sm:text-lg">CSS</p>
                    </li>
                </ul>
            </div>
            <div>
                <ul class="grid grid-cols-7">
                    <!-- Vue.js -->
                    <li class="col-span-1 flex flex-col items-center justify-center">
                        <div
                            class="flex items-center justify-center lg:w-32 lg:h-32 sm:w-16 sm:h-16 w-10 h-10 bg-[#540FB1] rounded-full">
                            <img class="absolute w-4 sm:w-6 lg:w-20" src="~/assets/img/postgreSql.png" alt="Git" />
                        </div>
                        <p class="text-white mt-2 font-semibold text-xs sm:text-lg">PostgreSQL</p>
                    </li>
                    <!-- Nuxt 3 -->
                    <li class="col-span-1 flex flex-col items-center justify-center">
                        <div
                            class="flex items-center justify-center lg:w-32 lg:h-32 sm:w-16 sm:h-16 w-10 h-10 bg-[#540FB1] rounded-full">
                            <img class="absolute w-4 sm:w-6 lg:w-20" src="~/assets/img/Sql.png" alt="Nuxt" />
                        </div>
                        <p class="text-white mt-2 font-semibold text-xs sm:text-lg">SQL</p>
                    </li>
                    <!-- Vue.js -->
                    <li class="col-span-1 flex flex-col items-center justify-center">
                        <div
                            class="flex items-center justify-center lg:w-32 lg:h-32 sm:w-16 sm:h-16 w-10 h-10 bg-[#540FB1] rounded-full">
                            <img class="absolute w-4 sm:w-6 lg:w-20" src="~/assets/img/mySql.png" alt="Vue" />
                        </div>
                        <p class="text-white mt-2 font-semibold text-xs sm:text-lg">MySQL</p>
                    </li>
                    <!-- Git -->
                    <li class="col-span-1 flex flex-col items-center justify-center">
                        <div
                            class="flex items-center justify-center lg:w-32 lg:h-32 sm:w-16 sm:h-16 w-10 h-10 bg-[#540FB1] rounded-full">
                            <svg width="80" height="80" viewBox="-10.5 -9.45 21 18.9" fill=""
                                xmlns="http://www.w3.org/2000/svg"
                                class=" mt-4 mb-3 text-link dark:text-link-dark w-4 sm:w-6 lg:w-20 self-center text-sm me-0 flex origin-center transition-all ease-in-out">
                                <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
                                <g stroke="currentColor" stroke-width="1" fill="none">
                                    <ellipse rx="10" ry="4.5"></ellipse>
                                    <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                                    <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                                </g>
                            </svg>
                        </div>
                        <p class="text-white mt-2 font-semibold text-xs sm:text-lg">React</p>
                    </li>
                    <!-- JavaScript -->
                    <li class="col-span-1 flex flex-col items-center justify-center">
                        <div
                            class="flex items-center justify-center lg:w-32 lg:h-32 sm:w-16 sm:h-16 w-10 h-10 bg-[#540FB1] rounded-full">
                            <img class="absolute w-4 sm:w-6 lg:w-20" src="~/assets/img/python.png" alt="JavaScript" />
                        </div>
                        <p class="text-white mt-2 font-semibold text-xs sm:text-lg">Python</p>
                    </li>
                    <!-- HTML -->
                    <li class="col-span-1 flex flex-col items-center justify-center">
                        <div
                            class="flex items-center justify-center lg:w-32 lg:h-32 sm:w-16 sm:h-16 w-10 h-10 bg-[#540FB1] rounded-full">
                            <img class="absolute w-4 sm:w-6 lg:w-20" src="~/assets/img/django.png" alt="HTML" />
                        </div>
                        <p class="text-white mt-2 font-semibold text-xs sm:text-lg">Django</p>
                    </li>
                    <!-- CSS -->
                    <li class="col-span-1 flex flex-col items-center justify-center">
                        <div
                            class="flex items-center justify-center lg:w-32 lg:h-32 sm:w-16 sm:h-16 w-10 h-10 bg-[#540FB1] rounded-full">
                            <img class="absolute w-4 sm:w-6 lg:w-20" src="~/assets/img/aws.png" alt="CSS" />
                        </div>
                        <p class="text-white mt-2 font-semibold text-xs sm:text-lg">AWS</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>