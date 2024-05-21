import React, { useEffect, useState } from 'react';
import ModalBase from './ModalBase';
import { ModalBaseProps } from '@/components/modals/ModalBase';
import { Button, Title, Input, Label, ErrorMessage } from '@/components/ui';
import { UserData } from '@/models/user';
import { updateProfileServices } from '@/services/updateProfile';
import { useStore } from '@/store';
import { emailRegex, nameRegex, phoneRegex } from '@/utils/validationsRegex';
import { messageErrorCode, CustomErrorCodes } from '@/utils/errorCodeMessages';
import { countryPrefixes } from '@/utils/prefijos';

const EditUserModals = ({ isOpen, close, user: userDataFromProps }: ModalBaseProps & { user: UserData }) => {
    const [userData, setUserData] = useState<UserData>(userDataFromProps);
    const [errors, setErrors] = useState({
        firstNameError: '',
        lastNameError: '',
        phoneError: '',
        emailError: ''
    });
    const [prefix, setPrefix] = useState(userData.phonePrefix || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && userDataFromProps) {
            setUserData(userDataFromProps);
            setPrefix(userDataFromProps.phonePrefix || '');
        }
    }, [isOpen, userDataFromProps]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [`${name}Error`]: '' }));
    };

    const handlePrefixChangeInternal = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPrefix(event.target.value);
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

        let isValid = true;

        // Validaciones
        if (!nameRegex.test(userData.firstName)) {
            newErrors.firstNameError = messageErrorCode(CustomErrorCodes.INVALID_NAME) || '';
            isValid = false;
        }
        if (!nameRegex.test(userData.lastName)) {
            newErrors.lastNameError = messageErrorCode(CustomErrorCodes.INVALID_NAME) || '';
            isValid = false;
        }
        if (!emailRegex.test(userData.email)) {
            newErrors.emailError = messageErrorCode(CustomErrorCodes.INVALID_EMAIL) || '';
            isValid = false;
        }
        const fullPhoneNumber = `${prefix}${userData.phone}`;
        if (!phoneRegex.test(fullPhoneNumber)) {
            newErrors.phoneError = messageErrorCode(CustomErrorCodes.INVALID_PHONE_NUMBER) || '';
            isValid = false;
        }

        setErrors(newErrors);
        if (!isValid) {
            setIsSubmitting(false);
            return;
        }

        const updatedUserData = { ...userData, phonePrefix: prefix };

        try {
            const result = await updateProfileServices().updateUserInfo(updatedUserData);
            if (result.success) {
                useStore.getState().setUser(updatedUserData);
                close();
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
                    <div className='flex flex-row'>
                        <select 
                            id="prefix" 
                            name="prefix" 
                            onChange={handlePrefixChangeInternal}
                            className="border-1 border-grey_color rounded-10 px-[17px] w-[150px] h-[40px]"
                            value={prefix}
                        >
                            {countryPrefixes.map((country) => (
                            <option key={country.code} value={country.prefix}>
                                {country.name} ({country.prefix})
                            </option>
                            ))}
                        </select>
                        <Input
                            id="phone"
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
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
                </div>
                <Button type="submit" disabled={isSubmitting}>Save</Button>
                <Button type="button" onClick={() => close()}>Cancel</Button>
            </form>
        </ModalBase>
    );
};

export default EditUserModals;