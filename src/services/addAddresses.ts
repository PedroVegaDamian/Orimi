import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Address } from '@/models/user';

const addAddressToFirebase = async (userId: string, address: Address) => {
    try {
        const addressesRef = collection(db, 'addresses');
        const result = await addDoc(addressesRef, {
            userId: userId,
            ...address
        });
        console.log('Address added with ID: ', result.id);
        return { ...address, id: result.id };
    } catch (error) {
        console.error("Error adding address: ", error);
        throw error;
    }
};


export { addAddressToFirebase };

