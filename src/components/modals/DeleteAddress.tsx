import ModalBase from './ModalBase';
import { ModalBaseProps } from '@/components/modals/ModalBase';
import { Title, Button } from "@/components/ui";

import toast from 'react-hot-toast';

interface DeleteAddressModalProps extends ModalBaseProps {
    onDeleteAddress: (addressId: string) => Promise<void>;
    addressId: string;
}

const DeleteAddressModal: React.FC<DeleteAddressModalProps> = ({ isOpen, close, onDeleteAddress, addressId }) => {
    const notifySuccess = () => {
        toast.success('Address successfully deleted.');
    };
    
    const notifyError = () => {
        toast.error('Failed to delete the address.');
    };

    const handleDelete = async () => {
        try {
            await onDeleteAddress(addressId);
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
                <Button type="button" onClick={close} extraClass='bg-white_color'>Cancel</Button>
            </div>
        </ModalBase>
    );
};

export default DeleteAddressModal;
