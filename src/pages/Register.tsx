import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from '@/firebase/index'
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

//Intentar separar la lógica del componente en un Hook
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validación del nombre
        const nameRegex = /^[A-Za-z]+( [A-Za-z]+)?$/;
        if (!nameRegex.test(firstName.trim())) {
            console.error("Invalid name format. The name must contain only these letters, and have at most one space.");
            return;
        }

        // Validación de formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.error("Invalid email format or the email contains spaces");
            return;
        }

        // Validación de la contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            console.error("Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one number.");
            return;
        }

        // Validación de contraseñas que coincidan
        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            return;
        }

        try {
//services => manejar la función de createUserWithEmailAndPassword en el directorio de servicios
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone
                });
                console.log("User Registered Successfully!!");

                // Reseteo de los campos del formulario
                setEmail('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setPhone('');
                setConfirmPassword('');

                // Loader
                // Navegar a HomePage cambiar a perfil
                navigate('/');
            }
        } catch (error: unknown) { // Captura el error como unknown
            console.error("Failed to register user:", error);
            if (typeof error === "object" && error !== null && "code" in error && (error as { code: unknown }).code === 'auth/email-already-in-use') {
                console.error("This email is already in use. Please use a different email.");
            } else if (error instanceof Error) { // Verifica si error es una instancia de Error
                console.error("Error during registration:", error.message);
            } else {
                console.error("Unknown error occurred during registration");
            }
        }        
    };

    return (
        <form onSubmit={handleRegister}>
            <h3>Sign Up</h3>

            <div className="mb-3">
                <label>First name</label>
                <input
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
                required
                />
            </div>

            <div className="mb-3">
                <label>Last name</label>
                <input
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label>Phone</label>
                <input
                type="text"
                className="form-control"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label>Email address</label>
                <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>

            <div className="mb-3">
                <label>Password</label>
                <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>

            <div className="mb-3">
                <label>Confirm Password</label>
                <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />
            </div>


            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                Sign Up
                </button>
            </div>
        </form>
    );
}
export default RegisterPage;
