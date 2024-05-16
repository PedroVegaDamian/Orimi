import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Address } from '@/models/user';  

export const fetchAddressesFromFirebase = async (userId: string) => {
    try {
        const addressesRef = collection(db, 'users', userId, 'addresses');
        const snapshot = await getDocs(addressesRef);

        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }

        return snapshot.docs.map(doc => {
            const data = doc.data() as Address;  
            return {
                ...data,
                id: doc.id  
            };
        });
    } catch (error) {
        console.error("Error fetching addresses: ", error);
        throw error;
    }
};

export default fetchAddressesFromFirebase;
