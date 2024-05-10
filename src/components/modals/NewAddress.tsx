import React, { useState } from 'react';
import ModalBase from './ModalBase';
import { ModalBaseProps } from '@/components/modals/ModalBase';
import { Input, Label, Title, Button, ErrorMessage } from "../ui";
import { addressRegex } from '@/utils/validationsRegex';
import { messageErrorCode, CustomErrorCodes } from '@/utils/errorCodeMessages';
import { addAddressToFirebase } from '@/services/addAddresses';
import { Address } from '@/models/user';

export const NewAddressModal = ({ isOpen, close, user }: ModalBaseProps & { user: Address }) => {
    const [newAddress, setNewAddress] = useState<Address>({
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
    });
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
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    //Validaciones
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
                newAddress.id = `id-${Date.now()}`;  // Supone que el ID se genera aquí para simplificar
                await addAddressToFirebase(user.id, newAddress);
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
                    <Label htmlFor='notes'>Observaciones de envío</Label>
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
                        Usar como mi dirección de envío predeterminada. 
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
                        Usar como mi dirección de facturación predeterminada.
                    </label>
                </div>
                //TODO: disable si se pincha una vez
                <Button type="submit" disabled={isSubmitting}>Save</Button>
                <Button type="button" onClick={close}>Cancel</Button>
            </form>
        </ModalBase>
    );
};

export default NewAddressModal;