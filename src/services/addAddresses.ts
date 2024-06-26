import { db } from '@/firebase';
import { doc, collection, addDoc, getDocs } from 'firebase/firestore';
import { Address } from '@/models/user';

const addAddressToFirebase = async (userId: string, address: Address) => {
    const addressesRef = collection(db, 'addresses', userId, 'userAddresses');
    const snapshot = await getDocs(addressesRef)

    if (snapshot.size >= 3) {
        console.error('No more than 3 addresses allowed');
        return;
    }

    try {
        const userDocRef = doc(db, 'users', userId);
        const addressesRef = collection(userDocRef, 'addresses');
        const result = await addDoc(addressesRef, address);
        
        console.log('Address added with ID: ', result.id);
        return { ...address, id: result.id };
    } catch (error) {
        console.error("Error adding address: ", error);
        throw error;
    }
};

export { addAddressToFirebase };
