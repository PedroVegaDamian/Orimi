import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '@/models/user';
import { auth } from '@/firebase'; // Importar autenticación de Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importar el método de registro de Firebase
import { setDoc, doc } from 'firebase/firestore'; // Importar Firestore
import { db } from '@/firebase'; // Importar inicialización de Firebase
import { emailRegex, passwordRegex, nameRegex, phoneRegex } from '@/utils/validationsRegex';
import { errorMessages, CustomErrorCodes } from '@/utils/errorCodeMessages';
import { countryPrefixes } from '@/utils/prefixes';

export function useRegister() {
    const [userData, setUserData] = useState<UserData>({
        id: '',
        firstName: '',
        lastName: '',
        phonePrefix: countryPrefixes[0].prefix,
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        addresses: [],
    });
    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');
    const [phoneError, setPhoneError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [prefix, setPrefix] = useState(countryPrefixes[0].prefix);
    
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev: UserData) => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handlePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const prefix = e.target.value;
        setPrefix(prefix);
        setUserData(prev => ({ ...prev, phonePrefix: prefix }));
        setErrors(prev => ({ ...prev, phoneError: '' }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};
        let isValid = true;

        setEmailError('');
        setFirstNameError('');
        setLastNameError('');
        setPhoneError('');
        setPasswordError('');
        setConfirmPasswordError('');

        // Validación del nombre
        if (!userData.firstName) {
            newErrors.firstNameError = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
            isValid = false;
        } else if (!nameRegex.test(userData.firstName)) {
            newErrors.firstNameError = errorMessages[CustomErrorCodes.INVALID_NAME];
            isValid = false;
        }

        // Validación del apellido
        if (!userData.lastName) {
            newErrors.lastNameError = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
            isValid = false;
        } else if (!nameRegex.test(userData.lastName)) {
            newErrors.lastNameError = errorMessages[CustomErrorCodes.INVALID_NAME];
            isValid = false;
        }

        // Validación del teléfono
        const fullPhoneNumber = `${prefix}${userData.phone}`;
        if (!userData.phone) {
            newErrors.phoneError = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
            isValid = false;
        } else if (!phoneRegex.test(fullPhoneNumber)) {
            newErrors.phoneError = errorMessages[CustomErrorCodes.INVALID_PHONE_NUMBER];
            isValid = false;
        }

        // Validación de formato de correo
        if (!userData.email) {
            newErrors.emailError = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
            isValid = false;
        } else if (!emailRegex.test(userData.email)) {
            newErrors.emailError = errorMessages[CustomErrorCodes.INVALID_EMAIL];
            isValid = false;
        }

        // Validación de la contraseña
        if (!userData.password) {
            newErrors.passwordError = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
            isValid = false;
        } else if (!passwordRegex.test(userData.password)) {
            newErrors.passwordError = errorMessages[CustomErrorCodes.WEAK_PASSWORD];
            isValid = false;
        }

        // Validación de confirmación de contraseña
        if (!userData.confirmPassword) {
            newErrors.confirmPasswordError = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
            isValid = false;
        } else if (userData.password !== userData.confirmPassword) {
            newErrors.confirmPasswordError = errorMessages[CustomErrorCodes.INVALID_CONFIRM_PASSWORD];
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            return;
        }

        try {
            // Registrar usuario con Firebase Authentication y obtener el UID
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            const uid = userCredential.user.uid;

            // Guardar datos adicionales del usuario en Firestore
            await setDoc(doc(db, 'users', uid), {
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                phonePrefix: prefix, // Usar el prefijo actualizado
                email: userData.email,
                addresses: userData.addresses,
            });
            console.log('Usuario registrado con éxito y datos guardados en Firestore');
            navigate('/profile');
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            if (error instanceof Error) {
                setEmailError(error.message);
            } else {
                setEmailError("An unexpected error occurred.");
            }
        }
    };

    return {
        userData,
        setUserData,
        firstNameError,
        lastNameError,
        phoneError,
        emailError,
        passwordError,
        confirmPasswordError,
        handleInputChange,
        handlePrefixChange,
        handleRegister,
        errors
    };
}
