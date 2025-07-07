export interface IAccountTag {
  text: string
}

export interface IAccount {
  id: string
  label: IAccountTag[]
  type: 'LDAP' | 'Локальная'
  login: string
  password: string | null
}

export interface IAccountFormData {
  id: string
  label: string
  type: 'LDAP' | 'Локальная'
  login: string
  password: string
}
