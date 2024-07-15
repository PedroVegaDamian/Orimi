import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const sendResetPasswordEmail = (email: string) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log(" email with password reset sent.");
        })
        .catch((error: unknown) => {
            const err = error as { code: string; message: string; };
            console.error("Error sending the reset email", err.code, err.message);
        });
};