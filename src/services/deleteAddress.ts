import { Address } from "@/models/user";

export const apiDeleteAddress = (addressId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (addressId) { 
                resolve();
            } else {
                reject(new Error("No address ID provided"));
            }
        }, 1000);
    });
};

export interface UserData {
    addresses: Address[];
}

export const deleteAddress = (
    addressId: string, 
    setUserData: (updateFn: (prevUserData: UserData) => UserData) => void
) => {
    apiDeleteAddress(addressId).then(() => {
        setUserData(prevUserData => ({
            ...prevUserData,
            addresses: prevUserData.addresses.filter(addr => addr.id !== addressId)
        }));
    }).catch(error => {
        console.error('Error deleting address:', error);
    });
};
