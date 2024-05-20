import { Address } from "@/models/user";
import { db } from '@/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

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

const deleteAddressService = async (userId: string, addressId: string) => {
    const addressRef = doc(db, 'users', userId, 'addresses', addressId);
    try {
        await deleteDoc(addressRef);
        console.log(`Address with ID: ${addressId} deleted successfully`);
    } catch (error) {
        console.error('Error deleting address:', error);
        throw error;
    }
};

export { deleteAddressService };
