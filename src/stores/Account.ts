import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IAccount } from './IAccount'

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<IAccount[]>([])

  const testAccount = (account: IAccount): void => {
    console.log(account)
  }

  const addAccount = (account: IAccount) => {
    accounts.value.push(account)
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }

  const removeAccount = (id: number) => {
    accounts.value = accounts.value.filter((account) => account.id !== id)
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }

  return {
    testAccount,
    addAccount,
    removeAccount,
  }
})
