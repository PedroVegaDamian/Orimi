import { db } from '@/firebase';
import { doc, collection, addDoc } from 'firebase/firestore';
import { Address } from '@/models/user';

const addAddressToFirebase = async (userId: string, address: Address) => {
    try {
        // Referencia al documento del usuario
        const userDocRef = doc(db, 'users', userId);

        // Colección de direcciones dentro del documento del usuario
        const addressesRef = collection(userDocRef, 'addresses');

        // Agregar la dirección a la colección de direcciones del usuario
        const result = await addDoc(addressesRef, address);
        console.log('Address added with ID: ', result.id);
        return { ...address, id: result.id };
    } catch (error) {
        console.error("Error adding address: ", error);
        throw error;
    }
};

export { addAddressToFirebase };
