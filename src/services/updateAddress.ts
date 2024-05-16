import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { Address } from '@/models/user';

export const updateAddress = async (addressId: string, address: Omit<Address, 'id'>) => {
    try {
        const addressRef = doc(db, 'addresses', addressId);
        const docSnap = await getDoc(addressRef);
        
        if (!docSnap.exists()) {
            console.error(`No document to update: ${addressRef.path}`);
            return;  // Salir de la función si el documento no existe
        }

        await updateDoc(addressRef, address);
    } catch (error) {
        console.error(`Error updating address with id ${addressId}:`, error);
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
