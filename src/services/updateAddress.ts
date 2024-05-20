import { db } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Address } from '@/models/user';

const updateAddress = async (userId: string, addressId: string, addressData: Partial<Address>) => {
    const addressRef = doc(db, 'users', userId, 'addresses', addressId);
    try {
        await updateDoc(addressRef, addressData);
        console.log('Address updated successfully');
    } catch (error) {
        console.error(`No document to update: ${addressRef.path}`, error);
        throw error;
    }
};

// Tipo de respuesta de la API
interface ApiResponse {
    success: boolean;
    data?: Address;
    message?: string;
}

export const apiUpdateAddress = async (addressId: string, addressData: Address): Promise<ApiResponse> => {
    try {
        const response = await fetch(`/api/addresses/${addressId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addressData),
        });
        if (!response.ok) throw new Error('Failed to update the address');
        return await response.json() as ApiResponse;
    } catch (error) {
        console.error('API call failed:', error);
        throw error; 
    }
};


export { updateAddress };
