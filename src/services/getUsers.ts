import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@/firebase'
import { UserData } from '@/models/user'

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

export const getCurrentUser = (): Promise<UserData | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            unsubscribe(); // Detener la escucha una vez obtenemos el estado del usuario
            if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            const docSnapshot = await getDoc(userDocRef);
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                console.log('Datos recuperados de Firestore:', userData); // Esto mostrará todos los datos recuperados
                resolve({
                email: user.email || '',
                id: user.uid,
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                phone: userData.phone || '',
                password: '',  
                confirmPassword: '',
                addresses: userData.addresses || [], 
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
            unsubscribe();  // Asegurarse de desubscribirse en caso de error
            console.error('Error al escuchar el estado de autenticación:', error);
            reject(error);
        });
        });
    };
