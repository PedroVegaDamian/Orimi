export const userModels = {
    UserData: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    UserFormErrors: {
        firstNameError: '',
        lastNameError: '',
        phoneError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
    }
};

export interface UserData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
}