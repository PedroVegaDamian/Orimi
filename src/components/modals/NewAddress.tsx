import React, { useState, useEffect, useMemo } from 'react';
import ModalBase from './ModalBase';
import { ModalBaseProps } from '@/components/modals/ModalBase';
import { Input, Label, Title, Button, ErrorMessage, Checkbox } from "@/components/ui";
import { addressRegex } from '@/utils/validationsRegex';
import { messageErrorCode, CustomErrorCodes } from '@/utils/errorCodeMessages';

import { Address } from '@/models/user';
import { db } from '@/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import toast from 'react-hot-toast';

interface NewAddressModalProps extends ModalBaseProps {
    existingAddresses: Address[];
    updateAddress: (addressId: string, address: Partial<Address>) => void;
    handleNewAddress: (address: Partial<Address>) => void;
}

const NewAddressModal: React.FC<NewAddressModalProps> = ({ isOpen, close, existingAddresses, handleNewAddress }) => {
    const initialAddressState = useMemo(() => ({
        id: '',
        company: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        notes: '',
        isDefault: false,
        invoice: false,
    }), []);

    const [newAddress, setNewAddress] = useState<Partial<Address>>(initialAddressState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
        company: '',
        street: '',
        city: '',
        zip: '',
        country: '',
        state: '',
        notes: '',
    });

    const isFirstAddress = useMemo(() => existingAddresses.length === 0, [existingAddresses]);
    const notifySuccess = () => toast.success('Address successfully added.');
    const notifyError = (message: string) => toast.error(`Error: ${message}`);

    useEffect(() => {
        if (isOpen) {
            setNewAddress({ ...initialAddressState, isDefault: isFirstAddress });
            setErrors({
                company: '',
                street: '',
                city: '',
                zip: '',
                country: '',
                state: '',
                notes: '',
            });
        }
    }, [isOpen, initialAddressState, isFirstAddress]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let isValid = true;
        const newErrors = { ...errors };
    
        if (!newAddress.street) {
            newErrors.street = messageErrorCode(CustomErrorCodes.REQUIRED_FIELD);
            isValid = false;
        } else if (!addressRegex.street.test(newAddress.street)) {
            newErrors.street = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS);
            isValid = false;
        }
    
        if (!newAddress.city) {
            newErrors.city = messageErrorCode(CustomErrorCodes.REQUIRED_FIELD);
            isValid = false;
        } else if (!addressRegex.city.test(newAddress.city)) {
            newErrors.city = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS);
            isValid = false;
        }
    
        if (!newAddress.zip) {
            newErrors.zip = messageErrorCode(CustomErrorCodes.REQUIRED_FIELD);
            isValid = false;
        } else if (!addressRegex.zip.test(newAddress.zip)) {
            newErrors.zip = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS);
            isValid = false;
        }
    
        if (!newAddress.country) {
            newErrors.country = messageErrorCode(CustomErrorCodes.REQUIRED_FIELD);
            isValid = false;
        } else if (!addressRegex.country.test(newAddress.country)) {
            newErrors.country = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS);
            isValid = false;
        }
    
        if (!newAddress.state) {
            newErrors.state = messageErrorCode(CustomErrorCodes.REQUIRED_FIELD);
            isValid = false;
        } else if (!addressRegex.state.test(newAddress.state)) {
            newErrors.state = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS);
            isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            try {
                if (newAddress.isDefault && !isFirstAddress) {
                    const updatedAddresses = existingAddresses.map(addr => ({
                        ...addr,
                        isDefault: false,
                    }));
                    for (const addr of updatedAddresses) {
                        const addressRef = doc(db, 'addresses', addr.id);
                        const docSnap = await getDoc(addressRef);

                        if (docSnap.exists()) {
                            await updateDoc(addressRef, {
                                ...addr,
                                isDefault: false,
                            });
                        } else {
                            console.error(`No document to update: ${addr.id}`);
                        }
                    }
                }
                await handleNewAddress(newAddress);
                notifySuccess();
                close();
            } catch (error) {
                console.error('Failed to add new address:', error);
                notifyError((error as Error).message || 'Unknown error');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <ModalBase isOpen={isOpen} close={close}>
            <div className='sticky top-0 left-0 right-0 bg-white_color z-1 p-4 mx-auto max-w-[500px]'>
                <Title>Add new address</Title>
            </div>
            <form onSubmit={handleSubmit} className='bg-white_color p-4 rounded-lg max-h-full overflow-auto'>
                <div className="flex flex-row flex-wrap items-start justify-center mx-auto gap-x-[50px] gap-y-[20px]">
                    <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                        <Label htmlFor='company'>Company</Label>
                        <Input
                            id="company"
                            type="text"
                            placeholder="Company"
                            name="company"
                            value={newAddress.company || ''}
                            onChange={handleChange}
                        />
                        <div style={{ height: '10px' }}>
                            <ErrorMessage message={errors.company} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                        <Label htmlFor='street'>Street<span className="text-red_color">*</span></Label>
                        <Input
                            id="street"
                            type="text"
                            placeholder="Street"
                            name="street"
                            value={newAddress.street || ''}
                            onChange={handleChange}
                        />
                        <div style={{ height: '10px' }}>
                            <ErrorMessage message={errors.street} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                        <Label htmlFor='city'>City<span className="text-red_color">*</span></Label>
                        <Input
                            id="city"
                            type="text"
                            placeholder="City"
                            name="city"
                            value={newAddress.city || ''}
                            onChange={handleChange}
                        />
                        <div style={{ height: '10px' }}>
                            <ErrorMessage message={errors.city} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                        <Label htmlFor='zip'>Zip<span className="text-red_color">*</span></Label>
                        <Input
                            id="zip"
                            type="text"
                            placeholder="Zip"
                            name="zip"
                            value={newAddress.zip || ''}
                            onChange={handleChange}
                        />
                        <div style={{ height: '10px' }}>
                            <ErrorMessage message={errors.zip} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                        <Label htmlFor='country'>State<span className="text-red_color">*</span></Label>
                        <Input
                            id="state"
                            type="text"
                            placeholder="state"
                            name="state"
                            value={newAddress.state || ''}
                            onChange={handleChange}
                        />
                        <div style={{ height: '10px' }}>
                            <ErrorMessage message={errors.state} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                        <Label htmlFor='country'>Country<span className="text-red_color">*</span></Label>
                        <Input
                            id="country"
                            type="text"
                            placeholder="Country"
                            name="country"
                            value={newAddress.country || ''}
                            onChange={handleChange}
                        />
                        <div style={{ height: '10px' }}>
                            <ErrorMessage message={errors.country} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                        <Label htmlFor='notes'>Shipping Remarks</Label>
                        <Input
                            id="notes"
                            type="text"
                            placeholder="Observations"
                            name="notes"
                            value={newAddress.notes || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {!isFirstAddress && (
                    <div className='flex items-center justify-center flex-col ml-5 flex-wrap'>
                        <Checkbox
                            id="defaultAddressCheck"
                            name="isDefault"
                            checked={newAddress.isDefault||false}
                            onChange={() => setNewAddress({ ...newAddress, isDefault: !newAddress.isDefault })}
                            label="Use as my default shipping address."
                        />
                        <Checkbox
                            id="invoiceAddressCheck"
                            name="invoice"
                            checked={newAddress.invoice||false}
                            onChange={() => setNewAddress({ ...newAddress, invoice: !newAddress.invoice })}
                            label="Use as my default billing address."
                        />
                    </div>
                )}
                <div className='sticky bottom-0 left-0 right-0 bg-white_color z-10 p-4 mx-auto w-full max-w-2xl'>
                    <div className='flex justify-evenly gap-[20px]'>
                        <Button type="submit" disabled={isSubmitting}>Save</Button>
                        <Button type="button" onClick={close} extraClass='bg-white_color'>Cancel</Button>
                    </div>
                </div>
            </form>
        </ModalBase>
    );
};

export default NewAddressModal;