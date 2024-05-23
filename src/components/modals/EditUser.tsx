import React, { useEffect, useState } from 'react';
import ModalBase from './ModalBase';
import { ModalBaseProps } from '@/components/modals/ModalBase';
import { Button, Title, Input, Label, ErrorMessage } from '@/components/ui';
import { UserData } from '@/models/user';
import { updateProfileServices } from '@/services/updateProfile';
import { useStore } from '@/store';
import { nameRegex, phoneRegex } from '@/utils/validationsRegex';
import { messageErrorCode, CustomErrorCodes } from '@/utils/errorCodeMessages';
import { countryPrefixes } from '@/utils/prefixes';

const EditUserModals = ({ isOpen, close, user: userDataFromProps }: ModalBaseProps & { user: UserData }) => {
    const [userData, setUserData] = useState<UserData>({ ...userDataFromProps });
    const [errors, setErrors] = useState({
        firstNameError: '',
        lastNameError: '',
        phoneError: '',
    });
    const [prefix, setPrefix] = useState(userDataFromProps.phonePrefix || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && userDataFromProps) {
            setUserData({ ...userDataFromProps });
            setPrefix(userDataFromProps.phonePrefix || countryPrefixes[0].prefix);
        }
    }, [isOpen, userDataFromProps]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [`${name}Error`]: '' }));
    };

    const handlePrefixChangeInternal = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newPrefix = event.target.value;
        setPrefix(newPrefix);
        setUserData(prev => ({ ...prev, phonePrefix: newPrefix }));
        setErrors(prev => ({ ...prev, phoneError: '' }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        const newErrors = {
            firstNameError: '',
            lastNameError: '',
            phoneError: '',
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

        // Validar el número de teléfono completo
        if (!phoneRegex.test(`${prefix}${userData.phone}`)) {
            newErrors.phoneError = messageErrorCode(CustomErrorCodes.INVALID_PHONE_NUMBER) || '';
            isValid = false;
        }

        setErrors(newErrors);
        if (!isValid) {
            setIsSubmitting(false);
            return;
        }

        const updatedUserData = { ...userData, phonePrefix: prefix, phone: userData.phone };

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

                <Button type="submit" disabled={isSubmitting}>Save</Button>
                <Button type="button" onClick={() => close()}>Cancel</Button>
            </form>
        </ModalBase>
    );
};

export default EditUserModals;