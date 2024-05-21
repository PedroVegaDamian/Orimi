import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { UserData } from '@/models/user';

export const getUserData = async (userId: string): Promise<UserData | null> => {
    try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data() as UserData;
            return {
                id: userId,
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                phonePrefix: userData.phonePrefix || '',
                phone: userData.phone || '',
                email: userData.email || '',
                password: '',
                confirmPassword: '',
                addresses: userData.addresses || []
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        throw new Error('Error al obtener los datos del usuario');
    }
}

export const getCurrentUser = (): Promise<UserData | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            unsubscribe();
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const docSnapshot = await getDoc(userDocRef);
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data() as UserData;
                    console.log('Datos recuperados de Firestore:', userData);
                    resolve({
                        id: user.uid,
                        firstName: userData.firstName || '',
                        lastName: userData.lastName || '',
                        phonePrefix: userData.phonePrefix || '',
                        phone: userData.phone || '',
                        email: user.email || '',
                        password: '',
                        confirmPassword: '',
                        addresses: userData.addresses || []
                    });
                } else {
                    console.log('No se encontraron detalles adicionales en Firestore');
                    resolve(null);
                }
            } else {
                console.log('No hay usuario autenticado');
                resolve(null);
            }
        }, (error) => {
            unsubscribe();
            console.error('Error al escuchar el estado de autenticación:', error);
            reject(error);
        });
    });
};
