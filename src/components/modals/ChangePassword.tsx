import React, { useState } from 'react';
import ModalBase from './ModalBase';
import { Input, Label, Title, Button, ErrorMessage } from "@/components/ui";
import { updatePassword } from '@/services/updatePassword';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ChangePasswordModalProps {
    isOpen: boolean;
    close: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, close }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const navigate = useNavigate();

    const notifySuccess = () => toast.success('Password updated successfully.');
    const notifyError = (message: string) => toast.error(message);

    const validate = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!currentPassword) {
            newErrors.currentPassword = 'The current password is required.';
            isValid = false;
        }

        // Validation: currentPassword !== newPassword
        if (currentPassword === newPassword) {
            newErrors.currentPassword = 'The new password cannot be the same as the current password.';
            isValid = false;
        }

        if (!newPassword) {
            newErrors.newPassword = 'The new password is required.';
            isValid = false;
        } else if (newPassword !== confirmNewPassword) {
            newErrors.confirmNewPassword = 'Passwords do not match.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            try {
                await updatePassword(currentPassword, newPassword, navigate);
                notifySuccess();
                close();
            } catch (error) {
                console.error("Error al actualizar la contraseña:", error);
                if (error instanceof Error) {
                    if (error.message === 'The current password is incorrect.') {
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            currentPassword: 'The current password is incorrect.'
                        }));
                    }
                    notifyError(error.message);
                } else {
                    notifyError('An unexpected error occurred.');
                }
            }
        }
    };

    return (
        <ModalBase isOpen={isOpen} close={close}>
            <div className='sticky top-0 left-0 right-0 bg-white_color z-1 p-4 mx-auto md:max-w-[450px]'>
                <Title>Change Password</Title>
            </div>
            <form onSubmit={handleChangePassword} className='bg-white_color p-4 rounded-lg max-h-full overflow-y-auto'>
                <div className="flex md:flex-row md:flex-wrap flex-col flex-nowrap justify-center md:ml-4 mx-auto md:max-h-[340px] gap-x-[50px] gap-y-[20px]">
                    <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                        <Label htmlFor='currentPassword'>Current Password</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            placeholder="Current Password"
                            name="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <div style={{ height: '10px' }}>
                            <ErrorMessage message={errors.currentPassword} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                        <Label htmlFor='newPassword'>New Password</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            placeholder="New Password"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <div style={{ height: '10px' }}>
                            <ErrorMessage message={errors.newPassword} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
                        <Label htmlFor='confirmNewPassword'>Confirm New Password</Label>
                        <Input
                            id="confirmNewPassword"
                            type="password"
                            placeholder="Confirm New Password"
                            name="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                        <div style={{ height: '10px' }}>
                            <ErrorMessage message={errors.confirmNewPassword} />
                        </div>
                    </div>
                </div>
                <div className='sticky bottom-0 left-0 right-0 bg-white_color z-10 p-4 mx-auto w-[60%] max-w-2xl'>
                    <div className='flex justify-evenly gap-[20px]'>
                        <Button type="submit">Save</Button>
                        <Button type="button" onClick={close} extraClass='bg-white_color'>Cancelar</Button>
                    </div>
                </div>
            </form>
        </ModalBase>
    );
};

export default ChangePasswordModal;
