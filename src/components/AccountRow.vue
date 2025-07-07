<template>
  <tr class="items-center border border-slate-200 p-3 rounded-lg bg-white mb-2">
    <td class="text-gray-800">
      <input
        v-model="formData.label"
        type="text"
        placeholder="Введите метки через ;"
        maxlength="50"
        :class="[
          'w-full px-3 py-2 border border-slate-300 rounded text-sm transition-all duration-200',
          'focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10',
          { 'border-red-500 ring-3 ring-red-500/10': hasError && showErrors },
        ]"
        @blur="handleBlur"
      />
    </td>

    <td class="text-gray-800">
      <select
        v-model="formData.type"
        :class="[
          'w-full px-3 py-2 border border-slate-300 rounded text-sm transition-all duration-200',
          'focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10',
          { 'border-red-500 ring-3 ring-red-500/10': hasError && showErrors },
        ]"
        v-on:change="handleTypeChange"
        @blur="handleBlur"
      >
        <option value="Локальная">Локальная</option>
        <option value="LDAP">LDAP</option>
      </select>
    </td>

    <td class="text-gray-800">
      <input
        v-model="formData.login"
        type="text"
        placeholder="Логин"
        maxlength="100"
        :class="[
          'w-full px-3 py-2 border border-slate-300 rounded text-sm transition-all duration-200',
          'focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10',
          { 'border-red-500 ring-3 ring-red-500/10': !formData.login.trim() && showErrors },
        ]"
        @blur="handleBlur"
        required
      />
    </td>

    <td class="text-gray-800">
      <input
        v-if="formData.type === 'Локальная'"
        v-model="formData.password"
        type="password"
        placeholder="Пароль"
        maxlength="100"
        :class="[
          'w-full px-3 py-2 border border-slate-300 rounded text-sm transition-all duration-200',
          'focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10',
          { 'border-red-500 ring-3 ring-red-500/10': !formData.password.trim() && showErrors },
        ]"
        @blur="handleBlur"
        required
      />
      <div v-else class="bg-gray-100 rounded flex items-center justify-center">
        <span class="text-gray-500 text-base"></span>
      </div>
    </td>

    <td>
      <div>
        <button
          @click="deleteAccount"
          class="p-3 rounded cursor-pointer text-sm text-red-600"
          title="Удалить запись"
        >
          🗑️
        </button>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useAccountStore } from '@/stores/Account'
import type { IAccount, IAccountFormData } from '@/stores/IAccount'

interface Props {
  account: IAccount
}

const props = defineProps<Props>()
const emit = defineEmits<{
  delete: [id: string]
}>()

const accountStore = useAccountStore()
const showErrors = ref(false)

const formData = ref<IAccountFormData>({
  id: props.account.id,
  label: accountStore.stringifyTags(props.account.label),
  type: props.account.type,
  login: props.account.login,
  password: props.account.password || '',
})

const handleTypeChange = () => {
  if (formData.value.password === 'LDAP') {
    formData.value.password = ''
  }
}

const handleBlur = () => {
  showErrors.value = true
  if (accountStore.validAccount(formData.value)) {
    accountStore.updateAccount(formData.value)
  }
}

const deleteAccount = () => {
  emit('delete', props.account.id)
}

const hasError = computed(() => {
  if (!formData.value.login.trim()) return false
  if (formData.value.type === 'Локальная' && !formData.value.password.trim()) return true

  return false
})
</script>
