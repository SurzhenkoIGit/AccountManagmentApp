<script setup lang="ts"></script>

<template>
  <header>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <router-link to="/Home" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="../src/public/logo.svg" class="h-8" alt="Vue logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Управление учетными записями</span
          >
        </router-link>
        <div class="w-full md:block md:w-auto">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <router-link
                to="/"
                class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
                >Главная</router-link
              >
            </li>
            <li>
              <router-link
                to="/Accounts"
                class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >Управление записями</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </header>
</template>
