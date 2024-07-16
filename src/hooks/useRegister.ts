import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '@/models/user';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { handleInputChange, validateField } from '@/utils/validateField';
import { useUserStore } from '@/store/userStore';
import { errorMessages, CustomErrorCodes } from '@/utils/errorCodeMessages';
import { nameRegex, phoneRegex, emailRegex, passwordRegex } from '@/utils/validationsRegex';

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  phonePrefix?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

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
  const [errors, setErrors] = useState<Partial<ValidationErrors>>({});
  const setUser = useUserStore(state => state.setUser);
  const navigate = useNavigate();

  const handleInputChangeWithValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, setUserData, (name: string, value: string) => validateField(name, value, setErrors, userData));
  };

  const handlePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prefix = e.target.value;
    setUserData(prev => ({ ...prev, phonePrefix: prefix }));
    setErrors(prev => ({ ...prev, phonePrefix: '' }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    setErrors({});

    // Validación del nombre
    if (!userData.firstName) {
      newErrors.firstName = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
      isValid = false;
    } else if (!nameRegex.test(userData.firstName)) {
      newErrors.firstName = errorMessages[CustomErrorCodes.INVALID_NAME];
      isValid = false;
    }

    // Validación del apellido
    if (!userData.lastName) {
      newErrors.lastName = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
      isValid = false;
    } else if (!nameRegex.test(userData.lastName)) {
      newErrors.lastName = errorMessages[CustomErrorCodes.INVALID_NAME];
      isValid = false;
    }

    // Validación del teléfono
    if (!userData.phonePrefix) {
      newErrors.phonePrefix = errorMessages[CustomErrorCodes.REQUIRED_PREFIX];
      isValid = false;
    }
    const fullPhoneNumber = `${userData.phonePrefix}${userData.phone}`;
    if (!userData.phone) {
      newErrors.phone = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
      isValid = false;
    } else if (!phoneRegex.test(fullPhoneNumber)) {
      newErrors.phone = errorMessages[CustomErrorCodes.INVALID_PHONE_NUMBER];
      isValid = false;
    }

    // Validación de formato de correo
    if (!userData.email) {
      newErrors.email = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
      isValid = false;
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = errorMessages[CustomErrorCodes.INVALID_EMAIL];
      isValid = false;
    }

    // Validación de la contraseña
    if (!userData.password) {
      newErrors.password = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
      isValid = false;
    } else if (!passwordRegex.test(userData.password)) {
      newErrors.password = errorMessages[CustomErrorCodes.WEAK_PASSWORD];
      isValid = false;
    }

    // Validación de confirmación de contraseña
    if (!userData.confirmPassword) {
      newErrors.confirmPassword = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
      isValid = false;
    } else if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = errorMessages[CustomErrorCodes.INVALID_CONFIRM_PASSWORD];
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
      const userDoc = {
        id: uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        phonePrefix: userData.phonePrefix,
        email: userData.email
      };
      await setDoc(doc(db, 'users', uid), userDoc);
      console.log('Usuario registrado con éxito y datos guardados en Firestore');
      setUser(userDoc);
      navigate('/profile');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      if (error instanceof Error) {
        setErrors({ email: error.message });
      } else {
        setErrors({ email: 'An unexpected error occurred.' });
      }
    }
  };

  return {
    userData,
    errors,
    handleInputChange: handleInputChangeWithValidation,
    handlePrefixChange,
    handleRegister
  };
}
