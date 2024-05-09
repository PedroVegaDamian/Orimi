import React, { useEffect, useState } from 'react';
import ModalBase from './ModalBase';
import { ModalBaseProps } from '@/components/modals/ModalBase';
import { Button, Title, Input, Label, ErrorMessage } from '@/components/ui';
import { UserData } from '@/models/user';
import { updateProfileServices } from '@/services/updateProfile';
import { useStore } from '@/store';
import { emailRegex, nameRegex, phoneRegex } from '@/utils/validationsRegex';
import { messageErrorCode, CustomErrorCodes } from '@/utils/errorCodeMessages';

export const EditUserModals = ({ isOpen, close, user: userDataFromProps }: ModalBaseProps & { user: UserData }) => {
    const [userData, setUserData] = useState<UserData>(userDataFromProps);
    const [errors, setErrors] = useState({
        firstNameError: '',
        lastNameError: '',
        phoneError: '',
        emailError: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    //const setUser = useStore(state => state.setUser);

    useEffect(() => {
        if (isOpen && userDataFromProps) {
            setUserData(userDataFromProps);
        }
    }, [isOpen, userDataFromProps]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [`${name}Error`]: '' }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        const newErrors = {
            firstNameError: '',
            lastNameError: '',
            phoneError: '',
            emailError: ''
        };
    
        // Validaciones
        if (!nameRegex.test(userData.firstName)) {
            newErrors.firstNameError = messageErrorCode(CustomErrorCodes.INVALID_NAME) || '';
        }
        if (!nameRegex.test(userData.lastName)) {
            newErrors.lastNameError = messageErrorCode(CustomErrorCodes.INVALID_NAME) || '';
        }
        if (!emailRegex.test(userData.email)) {
            newErrors.emailError = messageErrorCode(CustomErrorCodes.INVALID_EMAIL) || '';
        }
        if (!phoneRegex.test(userData.phone)) {
            newErrors.phoneError = messageErrorCode(CustomErrorCodes.INVALID_PHONE_NUMBER) || '';
        }
    
        setErrors(newErrors);
        if (Object.values(newErrors).some(error => error !== '')) {
            setIsSubmitting(false); 
            return;
        }
    
        try {
            const result = await updateProfileServices().updateUserInfo(userData);
            if (result.success) {
                useStore.getState().setUser(userData); // Actualiza el usuario en el estado global
                close(); // Cierra el modal
            } else {
                console.error("Failed to update user details", result.message);
            }
        } catch (error) {
            console.error('Update failed:', error);
        }
        setIsSubmitting(false); 
    };
    
    

    return (
        <ModalBase isOpen={isOpen} close={close}>
            <form onSubmit={handleSubmit} className='bg-white_color p-4 rounded-lg pr-[40px]'>
                <Title>Contact information</Title>
                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor="firstName">First name<span className="text-red_color">*</span></Label>
                    <Input
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                    />
                    <ErrorMessage message={errors.firstNameError} />

                </div>

                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor="lastName">Last name<span className="text-red_color">*</span></Label>
                    <Input
                        id="lastName"
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                    />
                    <ErrorMessage message={errors.lastNameError} />

                </div>

                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='phone'>Phone<span className="text-red_color">*</span></Label>
                    <Input
                        id="phone"
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                    />
                    <ErrorMessage message={errors.phoneError} />
                </div>

                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='email'>Email address<span className="text-red_color">*</span></Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                    <ErrorMessage message={errors.emailError} />
                </div>//TODO: disable si se pincha una vez
                <Button type="submit" disabled={isSubmitting}>Save</Button>
                <Button type="button" onClick={() => close()}>Cancel</Button>
            </form>
        </ModalBase>
    );
};

export default EditUserModals;
