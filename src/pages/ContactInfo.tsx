import { useState, useCallback } from 'react';
import { useStore } from '@/store';
import { Title } from '@/components/ui';
import EditUserModals from '@/components/modals/EditUser';
import { sendResetPasswordEmail } from '@/services/passwordReset';

import IconPencil from '@/assets/icons/icon_pencil_black.svg';
import { UserData } from '@/models/user';

import useBodyScrollLock from '@/hooks/useBodyScrollLock';

import toast, { Toaster } from 'react-hot-toast';

const ContactInfoPage = () => {
    const { user } = useStore(state => ({
        user: state.user as UserData | null,
    }));
    const [isModalOpen, setIsModalOpen] = useState(false);
    useBodyScrollLock(isModalOpen);

    const handleResetPassword = useCallback(async () => {
        if (user && user.email) {
            try {
                await sendResetPasswordEmail(user.email);
                toast.success("Restore email sent to: " + user.email);
            } catch (error) {
                console.error("Error al enviar correo de restablecimiento:", error);
                toast.error("Error sending reset email");
            }
        } else {
            console.log("No se pudo obtener el correo electrónico del usuario.");
            toast.error("Could not get user email");
        }
    }, [user]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <section>
            <Title className='md:text-left md:pl-[100px]'>Contact Information</Title>
            <hr className='border-grey_color w-[90%] mx-auto'/>
            <div className="w-[90%] mx-auto pt-[24px] pb-[24px] flex flex-col md:flex-row justify-between items-center md:items-start">
                <div className="w-full md:w-auto mb-4 md:mb-0 flex flex-col items-start md:items-start">
                    <p>Name: {user.firstName} {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: &#40;{user.phonePrefix}&#41;{user.phone}</p>
                </div>
                <div className="w-full md:w-auto flex flex-col items-start">
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center mb-4 md:mb-0">
                        <img src={IconPencil} alt="Pencil Icon" className="mr-[10px]" />
                        <span>Edit</span>
                    </button>
                    {isModalOpen && (
                        <EditUserModals 
                            isOpen={isModalOpen} 
                            close={() => setIsModalOpen(false)} 
                            user={user} 
                        />
                    )}
                    <button onClick={handleResetPassword} className="flex items-center">
                        <img src={IconPencil} alt="Pencil Icon" className="mr-[10px]" />
                        <span>Change Password</span>
                    </button>
                </div>
            </div>
            <hr className='border-grey_color w-[90%] mx-auto'/>
            <Toaster position="bottom-right" reverseOrder={false} />
        </section>
    );
};

export default ContactInfoPage;
