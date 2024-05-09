//TODO: revisar y poner el TOAST

import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const sendResetPasswordEmail = async (email:string) => {
    const auth = getAuth();
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Correo de restablecimiento de contraseña enviado.");
    } catch (error:unknown) {
        const err=error as { code:string; message:string; };
        console.error("Error al enviar correo de restablecimiento:", err.code, err.message);
    }
};
