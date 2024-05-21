import ModalBase from './ModalBase';
import { ModalBaseProps } from '@/components/modals/ModalBase';
import { Title, Button } from "../ui";

interface DeleteAddressModalProps extends ModalBaseProps {
    onDeleteAddress: (addressId: string) => void;
    addressId: string;
}

const DeleteAddressModal: React.FC<DeleteAddressModalProps> = ({ isOpen, close, onDeleteAddress, addressId }) => {
    if (!isOpen) return null;

    return (
        <ModalBase isOpen={isOpen} close={close}>
            <Title>Delete Address</Title>
            <div className="form-check">
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Do you want to delete this address?
                </label>
            </div>
            <Button type="button" onClick={() => onDeleteAddress(addressId)}>Delete</Button>
            <Button type="button" onClick={close}>Cancel</Button>
        </ModalBase>
    );
};

export default DeleteAddressModal;
