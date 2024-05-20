import { useStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import ModalBase from '@/components/modals/ModalBase';
import { ModalBaseProps } from '@/components/modals/ModalBase';

import { deleteAccount } from '@/services/deleteAccount';
import { Button, Input, Title } from '@/components/ui';

import IconTrash from '@/assets/icons/icon_papelera_black.svg';

export const DeleteUserModal = ({ isOpen, close }: ModalBaseProps) => {
    const user = useStore(state => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const signOut = useStore(state => state.signOut);

    const handleDeleteAccount = async () => {
        if (user) {
            setIsLoading(true);
            try {
                await deleteAccount(password);
                signOut(navigate);
            } catch (error) {
                console.error("Error deleting account: ", error);
            } finally {
                setIsLoading(false);
                close();
            }
        } else {
            console.error('No user found.');
        }
    };

    return (
        <ModalBase isOpen={isOpen} close={close}>
            <Title>Delete account</Title>
            <div className="p-4">
                <p>Do you want to delete your account?</p>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />
                <Button onClick={handleDeleteAccount} size="large" bgColor="bg-red_color" extraClass='flex m-auto mt-[10px] justify-start items-center aling-left pl-[15px] bg-red-500' disabled={isLoading}>
                    <img src={IconTrash} alt="Trash Icon" className="mr-[28px]" />
                    {isLoading ? 'Deleting...' : 'Delete account'}
                </Button>
                <Button type="button" onClick={close}>Cancel</Button>
            </div>
        </ModalBase>
    );
};

export default DeleteUserModal;
