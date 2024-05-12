import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Address } from '@/models/user';  // Asegúrate de importar la definición de Address

export const fetchAddressesFromFirebase = async (userId: string) => {
    try {
        const addressesRef = collection(db, 'addresses');
        const q = query(addressesRef, where('userId', '==', userId));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }

        return snapshot.docs.map(doc => {
            const data = doc.data() as Address;  // Asegurando que los datos se traten como tipo Address
            return {
                ...data,
                id: doc.id  // Asegurando que el id del documento sobrescriba cualquier id en data si existiera
            };
        });
    } catch (error) {
        console.error("Error fetching addresses: ", error);
        throw error;
    }
};

export default fetchAddressesFromFirebase;
