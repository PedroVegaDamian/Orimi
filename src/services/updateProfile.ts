import { auth, db } from "@/firebase";
import { updateProfile, updateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { phoneRegex, nameRegex, emailRegex } from '@/utils/validationsRegex';
import { messageErrorCode, CustomErrorCodes } from '@/utils/errorCodeMessages';
import { UserData } from '@/models/user';

interface ErrorMessages {
    firstNameError?: string;
    lastNameError?: string;
    emailError?: string;
    phoneError?: string;
}

export const updateProfileServices = () => {
    const updateUserInfo = async (userData: UserData) => {
        const { firstName, lastName, email, phone } = userData;
        const errors: ErrorMessages = {};

        let isValid = true;

        if (!nameRegex.test(firstName)) {
            errors.firstNameError = messageErrorCode(CustomErrorCodes.INVALID_NAME);
            isValid = false;
        }
        if (!nameRegex.test(lastName)) {
            errors.lastNameError = messageErrorCode(CustomErrorCodes.INVALID_NAME);
            isValid = false;
        }
        if (!emailRegex.test(email)) {
            errors.emailError = messageErrorCode(CustomErrorCodes.INVALID_EMAIL);
            isValid = false;
        }
        if (!phoneRegex.test(phone)) {
            errors.phoneError = messageErrorCode(CustomErrorCodes.INVALID_PHONE_NUMBER);
            isValid = false;
        }

        if (!isValid) {
            console.error("Validation errors", errors);
            return { success: false, errors };
        }

        const user = auth.currentUser;
        if (!user) {
            return { success: false, message: "No hay usuario autenticado." };
        }

        //TODO: Poner el loader
        try {
            // Actualización del perfil en Auth
            await updateProfile(user, { displayName: `${firstName} ${lastName}` });
            // Actualización del email en Auth
            await updateEmail(user, email);
            // Actualización del perfil en Firestore
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { 
                firstName: firstName, 
                lastName: lastName,
                email: email, 
                phone: phone
            });
            console.log("Usuario actualizado correctamente:", firstName, lastName, email, phone);
            return { success: true };
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            return { success: false, message: "Error al actualizar el usuario." };
        }
    };

    return { updateUserInfo };
};

export default updateProfileServices;
