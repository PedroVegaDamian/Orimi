import { useState, useCallback } from 'react';
import { useStore } from '@/store';
import { Title } from '@/components/ui';
import EditUserModals from '@/components/modals/EditUser';
import { sendResetPasswordEmail } from '@/services/passwordReset';

import IconPencil from '@/assets/icons/icon_pencil_black.svg';
import { UserData } from '@/models/user';

import useBodyScrollLock from '@/hooks/useBodyScrollLock';

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
                console.log("Correo de restablecimiento enviado a:", user.email);
            } catch (error) {
                console.error("Error al enviar correo de restablecimiento:", error);
            }
        } else {
            console.log("No se pudo obtener el correo electrónico del usuario.");
        }
    }, [user]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <section>
            <Title>Contact Information</Title>
            <hr className='border-grey_color w-[90%] mx-auto'/>
            <div className="w-[90%] mx-auto pt-[24px] pb-[24px] flex flex-row justify-between items-start">
                <div>
                    <p>Name: {user.firstName} {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: &#40;{user.phonePrefix}&#41;{user.phone}</p>
                </div>
                <div>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center">
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
        </section>
    );
};

export default ContactInfoPage;
