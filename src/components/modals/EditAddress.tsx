import React, { useState, useEffect } from 'react';
import ModalBase from './ModalBase';

import { Address } from '@/models/user';
import { Input, Label, Title, Button, ErrorMessage } from "../ui";
import { messageErrorCode, CustomErrorCodes } from '@/utils/errorCodeMessages';
import { addressRegex } from '@/utils/validationsRegex';

interface EditAddressModalProps {
    isOpen: boolean;
    address: Address;
    updateAddress: (addressId: string, address: Address) => void; 
    close: () => void;
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({ isOpen, address, updateAddress, close }) => {
    const [editedAddress, setEditedAddress] = useState<Address>(address);
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
        setEditedAddress(address);
    }, [address]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedAddress({
            ...editedAddress,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!addressRegex.street.test(address.street)) {
            newErrors.street = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS) || '';
            isValid = false;
        }
    
        if (!addressRegex.city.test(address.city)) {
            newErrors.city = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS) || '';
            isValid = false;
        }
    
        if (!addressRegex.zip.test(address.zip)) {
            newErrors.zip = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS) || '';
            isValid = false;
        }
    
        if (!addressRegex.country.test(address.country)) {
            newErrors.country = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS) || '';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            updateAddress(editedAddress.id, editedAddress);
            close();
        }
    };

    return (
        <ModalBase isOpen={isOpen} close={close}>
            <form onSubmit={handleSubmit} className='bg-white_color p-4 rounded-lg'>
                <Title>Edit address</Title>
                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='company'>Company</Label>
                    <Input
                        id="company"
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={editedAddress.company}
                        onChange={handleChange}
                    />
                    <ErrorMessage message={errors.company} />
                </div>
                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='street'>Street</Label>
                    <Input
                        id="street"
                        type="text"
                        placeholder="Street"
                        name="street"
                        value={editedAddress.street}
                        onChange={handleChange}
                        required
                    />
                    <ErrorMessage message={errors.street} />
                </div>
                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='city'>City</Label>
                    <Input
                        id="city"
                        type="text"
                        placeholder="City"
                        name="city"
                        value={editedAddress.city}
                        onChange={handleChange}
                        required
                    />
                    <ErrorMessage message={errors.city} />
                </div>
                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='zip'>Zip</Label>
                    <Input
                        id="zip"
                        type="text"
                        placeholder="Zip"
                        name="zip"
                        value={editedAddress.zip}
                        onChange={handleChange}
                        required
                    />
                    <ErrorMessage message={errors.zip} />
                </div>
                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='country'>Country<span className="text-red_color">*</span></Label>
                    <Input
                        id="country"
                        type="text"
                        placeholder="Country"
                        name="country"
                        value={editedAddress.country}
                        onChange={handleChange}
                    />
                    <ErrorMessage message={errors.country} />
                </div>
                <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                    <Label htmlFor='notes'>Observaciones de envío</Label>
                    <Input
                        id="notes"
                        type="text"
                        placeholder="Observations"
                        name="notes"
                        value={editedAddress.notes}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={editedAddress.isDefault} 
                        onChange={() => setEditedAddress({...editedAddress, isDefault: !editedAddress.isDefault})}
                        id="defaultAddressCheck"
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Usar como mi dirección de envío predeterminada. 
                    </label>
                    </div>
                    <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={editedAddress.invoice}
                        onChange={() => setEditedAddress({...editedAddress, invoice: !editedAddress.invoice})}
                        id="invoiceAddressCheck"
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Usar como mi dirección de facturación predeterminada.
                    </label>
                </div>

                <Button type="submit">Save Changes</Button>
                <Button type="button" onClick={close}>Cancel</Button>
            </form>
        </ModalBase>
    );
};

export default EditAddressModal;
