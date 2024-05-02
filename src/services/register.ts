import { createUserWithEmailAndPassword, AuthError } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { messageErrorCode } from '@/utils/errorCodeMessages';
import { UserData } from '@/models/user';

export const registerUser = async (userData: UserData) => {
    const { email, password, firstName, lastName, phone } = userData;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            firstName, lastName, phone, email
        });
        return userCredential; 
    } catch (error) {
        if (error instanceof Error && 'code' in error) {
            const errorMessage = messageErrorCode((error as AuthError).code);
            // console.error(errorMessage);
            throw new Error(errorMessage); 
        } else {
            // console.error([CustomErrorCodes.FAIL_REGISTER_USER], error);
            throw new Error("Unknown error occurred during registration.");
        }
    }
}
