import { db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { UserData } from '@/models/user';

export const registerUser = async (userData: UserData) => {
    try {
        const userDocRef = doc(db, 'users', userData.id);
        await setDoc(userDocRef, {
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            phonePrefix: userData.phonePrefix,
            email: userData.email,
            addresses: userData.addresses,
        });
        console.log('Usuario registrado con éxito y datos guardados en Firestore');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        throw new Error('Error al registrar el usuario');
    }
};