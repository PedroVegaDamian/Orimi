import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '@/models/user';
import { registerUser } from '@/services/register';
import { emailRegex, passwordRegex, nameRegex, phoneRegex } from '@/utils/validationsRegex';
import { errorMessages, CustomErrorCodes } from '@/utils/errorCodeMessages';
import { userAuth } from '@/hooks/getUserData';

export function useRegister() {
    const [userData, setUserData] = useState<UserData>({
        id: '',
        firstName: '',
        lastName: '',
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
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev:UserData) => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true; 

        setEmailError('');
        setFirstNameError('');
        setLastNameError('');
        setPhoneError('');
        setPasswordError('');
        setConfirmPasswordError('');
    
        // Validación del nombre
        if (!nameRegex.test(userData.firstName)) {
            setFirstNameError(errorMessages[CustomErrorCodes.INVALID_NAME]);
            isValid = false;
        }
    
        // Validación del apellido
        if (!nameRegex.test(userData.lastName)) {
            setLastNameError(errorMessages[CustomErrorCodes.INVALID_NAME]);
            isValid = false;
        }
    
        // Validación del teléfono
        if (!phoneRegex.test(userData.phone)) {
            setPhoneError(errorMessages[CustomErrorCodes.INVALID_PHONE_NUMBER]);
            isValid = false;
        }

        // Validación de formato de correo
        if (!emailRegex.test(userData.email)) {
            setEmailError(errorMessages[CustomErrorCodes.INVALID_EMAIL]);
            isValid = false;
        }
    
        // Validación de la contraseña
        if (!passwordRegex.test(userData.password)) {
            setPasswordError(errorMessages[CustomErrorCodes.WEAK_PASSWORD]);
            isValid = false;
        }
    
        // Validación de confirmación de contraseña
        if (userData.password !== userData.confirmPassword) {
            setConfirmPasswordError(errorMessages[CustomErrorCodes.INVALID_CONFIRM_PASSWORD]);
            isValid = false;
        }

        setErrors(newErrors);
    
        if (!isValid) {
            return; 
        }
        
        //Nombre y apellido
        const [firstName, lastName] = typeof userData.fullName === 'string' ? userData.fullName.split(' ') : ['', ''];
        setUserData((prevUserData) => ({
            ...prevUserData,
            firstName,
            lastName,
        }));
    
        try {
            await registerUser(userData);
            userAuth.getState().changeUser(userData);
            navigate('/profile');  
        } catch (error) {
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
        confirmPassword,
        setConfirmPassword,
        firstNameError,
        lastNameError,
        phoneError,
        emailError,
        passwordError,
        confirmPasswordError,
        handleInputChange,
        handleRegister,
        errors 
    };
}