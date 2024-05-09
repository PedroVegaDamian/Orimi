import { signInWithEmailAndPassword, Auth } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@/firebase'
import { UserData } from '@/models/user'
import { doc, getDoc } from 'firebase/firestore';

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
            confirmPassword: ''  
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

export const signIn = async (auth: Auth, email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user }
    } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
  }
}