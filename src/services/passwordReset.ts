import { getAuth, updatePassword as firebaseUpdatePassword, reauthenticateWithCredential, EmailAuthProvider, signOut as firebaseSignOut } from "firebase/auth";
import { doc, updateDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import { FirebaseError } from 'firebase/app'; 
import { NavigateFunction } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';

const auth = getAuth();
const db = getFirestore();

const reauthenticate = async (email: string, currentPassword: string) => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("User is not authenticated.");
    }

    const credential = EmailAuthProvider.credential(email, currentPassword);
    await reauthenticateWithCredential(user, credential);
};

export const updatePassword = async (currentPassword: string, newPassword: string, navigate: NavigateFunction) => {
    const user = auth.currentUser;
    if (!user || !user.email) {
        throw new Error("User is not authenticated or does not have an email.");
    }

    try {
        // Reauthenticate the user
        await reauthenticate(user.email, currentPassword);
        
        // Update the password
        await firebaseUpdatePassword(user, newPassword);
        console.log("Password updated successfully.");

        // Update Firestore
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, {
            lastPasswordChange: serverTimestamp()
        });

        // Sign out the user and redirect to login
        const userStore = useUserStore.getState();
        await firebaseSignOut(auth);
        localStorage.removeItem('user');
        userStore.setUser(null);
        console.log('User has been signed out');
        navigate('/login');
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                throw new Error('The current password is incorrect.');
            } else if (error.code === 'auth/too-many-requests') {
                throw new Error('Access to this account has been temporarily disabled due to many failed login attempts.');
            } else {
                throw new Error(error.message);
            }
        } else {
            throw new Error('An unknown error occurred.');
        }
    }
};
