import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore"; 

const deleteAccount = async (password: string) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore(); 

    if (!user) {
        throw new Error("No user is currently signed in.");
    }

    try {
        // Reautenticar al usuario
        const credential = EmailAuthProvider.credential(user.email!, password);
        await reauthenticateWithCredential(user, credential);

        // Eliminar al usuario de la base de datos
        const userDocRef = doc(db, "users", user.uid);
        await deleteDoc(userDocRef);

        // Eliminar al usuario de la autenticación de Firebase
        await deleteUser(user);

        console.log("User account deleted successfully.");
    } catch (error) {
        console.error("Error deleting user account: ", error);
        throw error;
    }
};

export { deleteAccount };
