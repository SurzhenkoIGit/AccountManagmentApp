import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IAccountFormData, IAccountTag, IAccount } from './IAccount'

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<IAccount[]>([])

  const loadAccounts = () => {
    const stored = localStorage.getItem('accounts')
    if (stored) {
      accounts.value = JSON.parse(stored)
    }
  }

  const createAccount = (): IAccount => {
    return {
      id: Math.random().toString(36),
      label: [],
      type: 'Локальная',
      login: '',
      password: '',
    }
  }

  const addAccount = () => {
    const newAccount = createAccount()
    accounts.value.push(newAccount)
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
    console.log(newAccount)

    return newAccount
  }

  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter((account) => account.id !== id)
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }

  const updateAccount = (formData: IAccountFormData) => {
    const index = accounts.value.findIndex((i) => i.id === formData.id)
    if (index !== -1) {
      const updatedAccount: IAccount = {
        id: formData.id,
        label: parseAccountTags(formData.label),
        type: formData.type,
        login: formData.login,
        password: formData.type === 'LDAP' ? null : formData.password,
      }

      accounts.value[index] = updatedAccount
      localStorage.setItem('accounts', JSON.stringify(accounts.value))
      console.log(updatedAccount)
    }
  }

  const parseAccountTags = (tagString: string): IAccountTag[] => {
    if (!tagString.trim()) return []

    return tagString
      .split(';')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
      .map((tag) => ({ text: tag }))
  }

  const stringifyTags = (tags: IAccountTag[]): string => {
    return tags.map((tag) => tag.text).join('; ')
  }

  const validAccount = (formData: IAccountFormData): boolean => {
    if (!formData.login.trim()) return false
    if (formData.type === 'Локальная' && !formData.password.trim()) return false
    return true
  }

  const accountsCount = computed(() => accounts.value.length)

  loadAccounts()

  return {
    accounts,
    accountsCount,
    addAccount,
    removeAccount,
    updateAccount,
    parseAccountTags,
    stringifyTags,
    validAccount,
  }
})
