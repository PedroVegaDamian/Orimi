import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const fetchAddressesFromFirebase = async (userId: string) => {
    try {
        const addressesRef = collection(db, 'addresses');
        const q = query(addressesRef, where('userId', '==', userId));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }

        const addresses = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return addresses;
    } catch (error) {
        console.error("Error fetching addresses: ", error);
        throw error;
    }
};

export default fetchAddressesFromFirebase;
