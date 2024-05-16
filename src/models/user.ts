export interface UserData {
    id: string;
    [key: string]: string | number | Address[];
    firstName: string;
    lastName: string;
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
}
