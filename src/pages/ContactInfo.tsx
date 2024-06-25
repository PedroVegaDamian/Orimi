import { useState } from 'react';
import { useStore } from '@/store';
import { Title } from '@/components/ui';
import EditUserModals from '@/components/modals/EditUser';
import ChangePasswordModal from '@/components/modals/ChangePassword';

import IconPencil from '@/assets/icons/icon_pencil_black.svg';
import { UserData } from '@/models/user';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

const ContactInfoPage = () => {
    const { user } = useStore(state => ({
        user: state.user as UserData | null,
    }));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    useBodyScrollLock(isModalOpen || isPasswordModalOpen);

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
                    <button onClick={() => setIsPasswordModalOpen(true)} className="flex items-center">
                        <img src={IconPencil} alt="Pencil Icon" className="mr-[10px]" />
                        <span>Change Password</span>
                    </button>
                    {isPasswordModalOpen && (
                        <ChangePasswordModal 
                            isOpen={isPasswordModalOpen} 
                            close={() => setIsPasswordModalOpen(false)} 
                        />
                    )}
                </div>
            </div>
            <hr className='border-grey_color w-[90%] mx-auto'/>
        </section>
    );
};

export default ContactInfoPage;
