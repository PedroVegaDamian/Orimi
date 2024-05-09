import { auth } from "../firebase";
import { NavigateFunction } from 'react-router-dom';

export const signOut = async (navigate: NavigateFunction) => {
    try {
        await auth.signOut();
        localStorage.removeItem('user');  // Limpiar datos al cerrar sesión
        console.log('Usuario ha cerrado sesión');
        navigate('/login');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
};
