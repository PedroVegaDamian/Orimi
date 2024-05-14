export interface UserData {
  [key: string]: string | number
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  confirmPassword: string
}

export type UserPrimaryData = Pick<
  UserData,
  'firstName' | 'lastName' | 'phone' | 'email'
>
