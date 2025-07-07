<template>
  <div class="max-w-screen-xl items-center justify-between mx-auto p-4">
    <div class="flex flex-row items-center mb-5">
      <h1 class="mb-3 mr-2 text-2xl text-center font-bold">Учетные записи</h1>
      <button
        type="button"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-lg px-2.5 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        v-on:click="handleClickAdd"
      >
        +
      </button>
    </div>
    <div class="bg-gray-200 flex items-center">
      <icon-question class="mr-2" />
      <span
        >Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span
      >
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-5">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Метки</th>
            <th scope="col" class="px-6 py-3">Тип записи</th>
            <th scope="col" class="px-6 py-3">Логин</th>
            <th scope="col" class="px-6 py-3">Пароль</th>
            <th scope="col" class="px-6 py-3"><IconTrash /></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconTrash from '@/components/icons/IconTrash.vue'
import IconQuestion from '@/components/icons/IconQuestion.vue'
import { useAccountStore } from '@/stores/Account'
import type { IAccount } from '@/stores/IAccount'

const accountStore = useAccountStore()

const account: IAccount = {
  id: Date.now(),
  label: '',
  type: 'LDAP',
  login: '',
  password: '',
}

const handleClickAdd = () => {
  console.log('CLICK')
  accountStore.testAccount(account)
}
</script>
