export interface IAccount {
  id: number
  label: string
  type: 'LDAP' | 'Локальная'
  login: string
  password: string | null
}
