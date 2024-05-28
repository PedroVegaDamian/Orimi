import ModalBase from './ModalBase';
import { ModalBaseProps } from '@/components/modals/ModalBase';
import { Title, Button } from "@/components/ui";

interface DeleteAddressModalProps extends ModalBaseProps {
    onDeleteAddress: (addressId: string) => void;
    addressId: string;
}

const DeleteAddressModal: React.FC<DeleteAddressModalProps> = ({ isOpen, close, onDeleteAddress, addressId }) => {
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
                <Button type="button" onClick={() => onDeleteAddress(addressId)}>Delete</Button>
                <Button type="button" onClick={close} className='bg-transparent'>Cancel</Button>
            </div>
            
        </ModalBase>
    );
};

export default DeleteAddressModal;
