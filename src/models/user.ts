export interface UserData {
  id: string
  firstName: string
  lastName: string
  phonePrefix?: string
  phone: string
  email: string
  password: string
  confirmPassword: string
  addresses: Address[]
}

export interface PublicUserData {
  id: string
  firstName: string
  lastName: string
  phonePrefix?: string
  phone: string
  email: string
  addresses: Address[]
}

export interface Address {
  id: string
  company?: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  notes?: string
  isDefault: boolean
  invoice: boolean
}

export type UserPrimaryData = Pick<
  UserData,
  'id' | 'firstName' | 'lastName' | 'phonePrefix' | 'phone' | 'email'
>
