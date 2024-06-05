<<<<<<< feature/cartShopping
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserData } from '@/models/user'
import { registerUser } from '@/services/register'
import {
  emailRegex,
  passwordRegex,
  nameRegex,
  phoneRegex
} from '@/utils/validationsRegex'
import { errorMessages, CustomErrorCodes } from '@/utils/errorCodeMessages'
import { getUserById } from '@/services/user'
import { useUserStore } from '@/store/userStore'

export function useRegister() {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [firstNameError, setFirstNameError] = useState<string>('')
  const [lastNameError, setLastNameError] = useState<string>('')
  const [phoneError, setPhoneError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const navigate = useNavigate()
  const setUser = useUserStore(state => state.setUser)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // console.log("Input changed:", name, value);
    setUserData((prev: UserData) => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = {}
    let isValid = true // Suponemos que el formulario es válido inicialmente

    setEmailError('')
    setFirstNameError('')
    setLastNameError('')
    setPhoneError('')
    setPasswordError('')
    setConfirmPasswordError('')

    // Validación del nombre
    if (!nameRegex.test(userData.firstName)) {
      setFirstNameError(errorMessages[CustomErrorCodes.INVALID_NAME])
      isValid = false
    }

    // Validación del apellido
    if (!nameRegex.test(userData.lastName)) {
      setLastNameError(errorMessages[CustomErrorCodes.INVALID_NAME])
      isValid = false
    }

    // Validación del teléfono
    if (!phoneRegex.test(userData.phone)) {
      setPhoneError(errorMessages[CustomErrorCodes.INVALID_PHONE_NUMBER])
      isValid = false
    }

    // Validación de formato de correo
    if (!emailRegex.test(userData.email)) {
      setEmailError(errorMessages[CustomErrorCodes.INVALID_EMAIL])
      isValid = false
    }

    // Validación de la contraseña
    if (!passwordRegex.test(userData.password)) {
      setPasswordError(errorMessages[CustomErrorCodes.WEAK_PASSWORD])
      isValid = false
    }

    // Validación de confirmación de contraseña
    if (userData.password !== userData.confirmPassword) {
      setConfirmPasswordError(
        errorMessages[CustomErrorCodes.INVALID_CONFIRM_PASSWORD]
      )
      isValid = false
    }

    setErrors(newErrors)

    if (!isValid) {
      return // No continúa con el registro si el formulario es inválido
    }

    // Intenta registrar solo si todas las validaciones son correctas
    try {
      const result = await registerUser(userData)
      const user = await getUserById(result.user.uid)
      setUser(user)
      navigate('/') // Navega a la página de perfil
    } catch (error) {
      // console.error("Registration error:", error);
      if (error instanceof Error) {
        setEmailError(error.message) // Asume que el mensaje de error ya es adecuado para mostrar
      } else {
        setEmailError('An unexpected error occurred.') // Para cualquier otro tipo de error
      }
    }
  }

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
  }
=======
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '@/models/user';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { setDoc, doc } from 'firebase/firestore'; 
import { emailRegex, passwordRegex, nameRegex, phoneRegex } from '@/utils/validationsRegex';
import { errorMessages, CustomErrorCodes } from '@/utils/errorCodeMessages';
import { countryPrefixes } from '@/utils/prefixes';
import { useUserStore } from '@/store/userStore'; 

export function useRegister() {
    const [userData, setUserData] = useState<UserData>({
        id: '',
        firstName: '',
        lastName: '',
        phonePrefix: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        addresses: []
    });
    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');
    const [prefixError, setPrefixError] = useState<string>('');
    const [phoneError, setPhoneError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [prefix, setPrefix] = useState(countryPrefixes[0].prefix);
    const setUser = useUserStore(state => state.setUser); 
    
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

        setFirstNameError('');
        setLastNameError('');
        setPrefixError('');
        setPhoneError('');
        setEmailError('');
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
        if (!userData.phonePrefix) {
            newErrors.prefixError = errorMessages[CustomErrorCodes.REQUIRED_PREFIX];
            isValid = false;
        }
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
        setFirstNameError(newErrors.firstNameError || '');
        setLastNameError(newErrors.lastNameError || '');
        setPrefixError(newErrors.prefixError || '');
        setPhoneError(newErrors.phoneError || '');
        setEmailError(newErrors.emailError || '');
        setPasswordError(newErrors.passwordError || '');
        setConfirmPasswordError(newErrors.confirmPasswordError || '');

        if (!isValid) {
            return;
        }

        try {
            // Registrar usuario con Firebase Authentication y obtener el UID
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            const uid = userCredential.user.uid;

            // Guardar datos adicionales del usuario en Firestore
            const userDoc = {
                id: uid,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                phonePrefix: prefix, 
                email: userData.email,
            };
            await setDoc(doc(db, 'users', uid), userDoc);
            console.log('Usuario registrado con éxito y datos guardados en Firestore');
            setUser(userDoc);
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
        prefixError,
        phoneError,
        emailError,
        passwordError,
        confirmPasswordError,
        handleInputChange,
        handlePrefixChange,
        handleRegister,
        errors
    };
>>>>>>> develop
}
