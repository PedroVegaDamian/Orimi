import { UserData } from '@/models/user';

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  phonePrefix?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setUserData: React.Dispatch<React.SetStateAction<UserData>>,
  validateField: (name: string, value: string) => void
) => {
  const { name, value } = e.target;

  const validatedValue = value;

  if (name === 'phone') {
    if (validatedValue.length > 15) return; // Limitar a 15 caracteres
    if (/[^0-9]/.test(validatedValue)) return; // Permitir solo números
  }

  if (name === 'firstName' || name === 'lastName') {
    if (/[^a-zA-ZñÑ\s]/.test(validatedValue)) return; // Permitir solo letras y espacios
    if (validatedValue.split(/\s+/).length > 4) return; // No más de 3 espacios no continuos
    if (/^\s/.test(validatedValue) || /\s$/.test(validatedValue)) return; // Sin espacios al inicio ni al final
  }

  if (name === 'password' && /\s/.test(validatedValue)) return; // No permitir espacios en la contraseña

  setUserData((prev: UserData) => ({ ...prev, [name]: validatedValue }));
  validateField(name, validatedValue);
};

export const validateField = (
  name: string,
  value: string,
  setErrors: React.Dispatch<React.SetStateAction<Partial<ValidationErrors>>>,
  userData: UserData
) => {
  switch (name) {
    case 'firstName':
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: value ? '' : 'First name is required.'
      }));
      break;
    case 'lastName':
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: value ? '' : 'Last name is required.'
      }));
      break;
    case 'phone':
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: value ? '' : 'Phone is required.'
      }));
      break;
    case 'email':
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: value ? '' : 'Email is required.'
      }));
      break;
    case 'password':
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: value ? '' : 'Password is required.'
      }));
      break;
    case 'confirmPassword':
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: value === userData.password ? '' : 'Passwords do not match.'
      }));
      break;
    default:
      break;
  }
};
