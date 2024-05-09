import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export const getUserData = async (userId: string) => {
    try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
            return userDocSnap.data();
        } else {
            return null; // El usuario no fue encontrado en la base de datos
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        throw new Error('Error al obtener los datos del usuario');
    }
}
