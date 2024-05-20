import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";

const deleteAccount = async (password: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        throw new Error("No user is currently signed in.");
    }

    try {
        const credential = EmailAuthProvider.credential(user.email!, password);
        await reauthenticateWithCredential(user, credential);
        await deleteUser(user);
        console.log("User account deleted successfully.");
    } catch (error) {
        console.error("Error deleting user account: ", error);
        throw error;
    }
};

export { deleteAccount };
