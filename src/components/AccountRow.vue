<template>
  <tr class="items-center p-3 rounded-lg bg-white mb-2">
    <td class="text-gray-800">
      <input
        v-model="formData.label"
        type="text"
        placeholder="Введите метки через ;"
        maxlength="50"
        class="w-full rounded text-sm p-2"
      />
    </td>

    <td class="text-gray-800">
      <select
        v-model="formData.type"
        class="w-full rounded text-sm p-2"
        v-on:change="handleTypeChange"
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
        class="w-full rounded text-sm p-2"
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
        class="w-full rounded text-sm p-2"
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
import { ref } from 'vue'
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

const deleteAccount = () => {
  emit('delete', props.account.id)
}
</script>
