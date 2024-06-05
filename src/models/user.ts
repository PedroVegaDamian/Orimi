export interface UserData {
<<<<<<< feature/cartShopping
  [key: string]: string | number
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  confirmPassword: string
=======
  id: string;
  firstName: string;
  lastName: string;
  phonePrefix?: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  addresses: Address[];
}

export interface PublicUserData {
  id: string;
  firstName: string;
  lastName: string;
  phonePrefix?: string;
  phone: string;
  email: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  company?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  notes?: string;
  isDefault: boolean;
  invoice: boolean;
>>>>>>> develop
}

export type UserPrimaryData = Pick<
  UserData,
<<<<<<< feature/cartShopping
  'firstName' | 'lastName' | 'phone' | 'email'
=======
  'id' |'firstName' | 'lastName' | 'phonePrefix' | 'phone' | 'email'
>>>>>>> develop
>
