// import React, { useState, useEffect } from 'react';
import ModalBase from './ModalBase';
import { ModalBaseProps } from '@/components/modals/ModalBase';
// import { Address } from '@/models/user';
import { Title, Button } from "../ui";
// import { deleteAddress } from '@/services/deleteAddress';

interface DeleteAddressModalProps extends ModalBaseProps {
    onDeleteAddress: (addressId: string) => void;
    addressId: string;
}

const DeleteAddressModal: React.FC<DeleteAddressModalProps> = ({ isOpen, close: onClose, onDeleteAddress, addressId }) => {
    if (!isOpen) return null;

    return (
        <ModalBase isOpen={isOpen} close={close}>
            <Title>Delete Address</Title>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        ¿Deseas eliminar la cuenta?
                    </label>
                </div>
                <Button type="submit" onClick={() => onDeleteAddress(addressId)}>Eliminar</Button>
                <Button type="button" onClick={onClose}>Cancel</Button>
        </ModalBase>
    );
};

export default DeleteAddressModal;
