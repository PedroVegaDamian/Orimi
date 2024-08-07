import React, { useState, useEffect } from 'react';
import ModalBase from './ModalBase';
import { Address } from '@/models/user';
import { Input, Label, Title, Button, ErrorMessage, Checkbox } from "@/components/ui";
import { messageErrorCode, CustomErrorCodes } from '@/utils/errorCodeMessages';
import { addressRegex } from '@/utils/validationsRegex';

import toast from 'react-hot-toast';

interface EditAddressModalProps {
    isOpen: boolean;
    address: Address;
    updateAddress: (addressId: string, address: Address) => void;
    close: () => void;
    addresses: Address[];  
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({ isOpen, address, updateAddress, addresses, close }) => {
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

    const notifySuccess = () => toast.success('Address successfully updated.');
    const notifyError = (message: string) => toast.error(`Error: ${message}`);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedAddress({
            ...editedAddress,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setEditedAddress(prev => ({ ...prev, [name]: checked }));
    };    

    const validate = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!addressRegex.street.test(editedAddress.street)) {
            newErrors.street = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS) || '';
            isValid = false;
        }

        if (!addressRegex.city.test(editedAddress.city)) {
            newErrors.city = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS) || '';
            isValid = false;
        }

        if (!addressRegex.zip.test(editedAddress.zip)) {
            newErrors.zip = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS) || '';
            isValid = false;
        }

        if (!addressRegex.country.test(editedAddress.country)) {
            newErrors.country = messageErrorCode(CustomErrorCodes.INVALID_ADDRESS) || '';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            if (editedAddress.isDefault) {
                addresses.forEach(addr => {
                    if (addr.id !== editedAddress.id && addr.isDefault) {
                        updateAddress(addr.id, { ...addr, isDefault: false });
                    }
                });
            }
            try {
                updateAddress(editedAddress.id, editedAddress);
                notifySuccess();
                close();
            } catch (error) {
                notifyError((error as Error).message);
            }
        }
    };  

    return (
        <ModalBase isOpen={isOpen} close={close}>
            <div className='sticky top-0 left-0 right-0 bg-white_color z-1 p-4 mx-auto max-w-[450px]'>
                <Title>Edit address</Title>
            </div>
            <form onSubmit={handleSubmit} className='bg-white_color p-4 rounded-lg max-h-full overflow-y-auto'>
                <div className="flex flex-row flex-wrap items-center justify-center content-center mx-auto max-h-[340px] gap-x-[50px] gap-y-[20px]">
                    <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                        <Label htmlFor='company'>Company</Label>
                        <Input
                            id="company"
                            type="text"
                            placeholder="Company"
                            name="company"
                            value={editedAddress.company || ''}
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
                            value={editedAddress.street  || ''}
                            onChange={handleChange}
                            required
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
                            value={editedAddress.city  || ''}
                            onChange={handleChange}
                            required
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
                            value={editedAddress.zip  || ''}
                            onChange={handleChange}
                            required
                        />
                        <div style={{ height: '10px' }}>
                            <ErrorMessage message={errors.zip} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                        <Label htmlFor='country'>Country<span className="text-red_color">*</span></Label>
                        <Input
                            id="country"
                            type="text"
                            placeholder="Country"
                            name="country"
                            value={editedAddress.country  || ''}
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
                            value={editedAddress.notes  || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='flex items-center justify-center flex-col ml-5 mt-[100px] flex-wrap'>
                    <Checkbox
                        id="defaultAddressCheck"
                        name="isDefault"
                        checked={editedAddress.isDefault}
                        onChange={handleCheckboxChange}
                        label="Use as my default shipping address."
                    />
                    <Checkbox
                        id="invoiceAddressCheck"
                        name="invoice"
                        checked={editedAddress.invoice}
                        onChange={handleCheckboxChange}
                        label="Use as my default billing address."
                    />
                </div>
                <div className='sticky bottom-0 left-0 right-0 bg-white_color z-10 p-4 mx-auto w-[60%] max-w-2xl'>
                    <div className='flex justify-evenly gap-[20px]'>
                        <Button type="submit">Save</Button>
                        <Button type="button" onClick={close} extraClass='bg-white_color'>Cancel</Button>
                    </div>
                </div>
            </form>
        </ModalBase>
    );
};

export default EditAddressModal;
