import React, { useState, useEffect, useMemo } from 'react';
import ModalBase from './ModalBase';
import { ModalBaseProps } from '@/components/modals/ModalBase';
import { Input, Label, Title, Button, ErrorMessage } from "../ui";
import { addressRegex } from '@/utils/validationsRegex';
import { messageErrorCode, CustomErrorCodes } from '@/utils/errorCodeMessages';

import { Address } from '@/models/user';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface NewAddressModalProps extends ModalBaseProps {
    existingAddresses: Address[];
    updateAddress: (addressId: string, address: Partial<Address>) => void;
    handleNewAddress: (address: Partial<Address>) => void;
}

const NewAddressModal: React.FC<NewAddressModalProps> = ({ isOpen, close, existingAddresses, updateAddress, handleNewAddress }) => {
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

    useEffect(() => {
        if (isOpen) {
            setNewAddress(initialAddressState);
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
    }, [isOpen, initialAddressState]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!newAddress.street || !addressRegex.street.test(newAddress.street)) {
            newErrors.street = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS) || '';
            isValid = false;
        }

        if (!newAddress.city || !addressRegex.city.test(newAddress.city)) {
            newErrors.city = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS) || '';
            isValid = false;
        }

        if (!newAddress.zip || !addressRegex.zip.test(newAddress.zip)) {
            newErrors.zip = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS) || '';
            isValid = false;
        }

        if (!newAddress.country || !addressRegex.country.test(newAddress.country)) {
            newErrors.country = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS) || '';
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
                if (newAddress.isDefault) {
                    const updatedAddresses = existingAddresses.map(addr => ({
                        ...addr,
                        isDefault: false,
                    }));
                    for (const addr of updatedAddresses) {
                        const addressRef = doc(db, 'addresses', addr.id);
                        const docSnap = await getDoc(addressRef);

                        if (docSnap.exists()) {
                            await updateAddress(addr.id, {
                                id: addr.id,
                                company: addr.company,
                                street: addr.street,
                                city: addr.city,
                                state: addr.state,
                                zip: addr.zip,
                                country: addr.country,
                                notes: addr.notes,
                                isDefault: addr.isDefault,
                                invoice: addr.invoice,
                            });
                        } else {
                            console.error(`No document to update: ${addr.id}`);
                        }
                    }
                }
                await handleNewAddress(newAddress);
                close();
            } catch (error) {
                console.error('Failed to add new address:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <ModalBase isOpen={isOpen} close={close}>
            <form onSubmit={handleSubmit} className='bg-white_color p-4 rounded-lg pr-[40px]'>
                <Title>Add new address</Title>
                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='company'>Company</Label>
                    <Input
                        id="company"
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={newAddress.company}
                        onChange={handleChange}
                    />
                    <ErrorMessage message={errors.company} />
                </div>
                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='street'>Street<span className="text-red_color">*</span></Label>
                    <Input
                        id="street"
                        type="text"
                        placeholder="Street"
                        name="street"
                        value={newAddress.street}
                        onChange={handleChange}
                    />
                    <ErrorMessage message={errors.street} />
                </div>
                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='city'>City<span className="text-red_color">*</span></Label>
                    <Input
                        id="city"
                        type="text"
                        placeholder="City"
                        name="city"
                        value={newAddress.city}
                        onChange={handleChange}
                    />
                    <ErrorMessage message={errors.city} />
                </div>
                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='zip'>Zip<span className="text-red_color">*</span></Label>
                    <Input
                        id="zip"
                        type="text"
                        placeholder="Zip"
                        name="zip"
                        value={newAddress.zip}
                        onChange={handleChange}
                    />
                    <ErrorMessage message={errors.zip} />
                </div>
                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='country'>State<span className="text-red_color">*</span></Label>
                    <Input
                        id="state"
                        type="text"
                        placeholder="state"
                        name="state"
                        value={newAddress.state}
                        onChange={handleChange}
                    />
                    <ErrorMessage message={errors.state} />
                </div>
                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='country'>Country<span className="text-red_color">*</span></Label>
                    <Input
                        id="country"
                        type="text"
                        placeholder="Country"
                        name="country"
                        value={newAddress.country}
                        onChange={handleChange}
                    />
                    <ErrorMessage message={errors.country} />
                </div>
                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='notes'>Shipping Remarks</Label>
                    <Input
                        id="notes"
                        type="text"
                        placeholder="Observations"
                        name="notes"
                        value={newAddress.notes}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={newAddress.isDefault} 
                        onChange={() => setNewAddress({...newAddress, isDefault: !newAddress.isDefault})}
                        id="defaultAddressCheck"
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Use as my default shipping address. 
                    </label>
                    </div>
                    <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={newAddress.invoice}
                        onChange={() => setNewAddress({...newAddress, invoice: !newAddress.invoice})}
                        id="invoiceAddressCheck"
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Use as my default billing address.
                    </label>
                </div>
                <Button type="submit" disabled={isSubmitting}>Save</Button>
                <Button type="button" onClick={close}>Cancel</Button>
            </form>
        </ModalBase>
    );
};

export default NewAddressModal;
