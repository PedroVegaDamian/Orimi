import ModalBase from './ModalBase';
import { ModalBaseProps } from '@/components/modals/ModalBase';
import { Title, Button } from "@/components/ui";

import toast, { Toaster } from 'react-hot-toast';

interface DeleteAddressModalProps extends ModalBaseProps {
    onDeleteAddress: (addressId: string) => void;
    addressId: string;
}

const DeleteAddressModal: React.FC<DeleteAddressModalProps> = ({ isOpen, close, onDeleteAddress, addressId }) => {
    const notifySuccess = () => toast.success('Address successfully deleted.');
    const notifyError = () => toast.error('Failed to delete the address.');

    const handleDelete = () => {
        try {
            onDeleteAddress(addressId);
            notifySuccess();
            close();
        } catch (error) {
            notifyError();
        }
    };
    
    if (!isOpen) return null;

    return (
        <ModalBase isOpen={isOpen} close={close}>
            <Title>Delete Address</Title>
            <div className="form-check flex justify-center">
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Do you want to delete this address?
                </label>
            </div>
            <div className='flex direccion-row justify-center gap-[20px] mt-[20px]'>
                <Button type="button" onClick={handleDelete}>Delete</Button>
                <Button type="button" onClick={close} className='bg-transparent'>Cancel</Button>
            </div>
            <Toaster position="bottom-right" reverseOrder={false} />
        </ModalBase>
    );
};

export default DeleteAddressModal;
