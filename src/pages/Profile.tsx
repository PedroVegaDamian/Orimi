import { useStore } from '@/store';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import IconUser from '@/assets/icons/icon_user_black.svg';
import IconUserColor from '@/assets/icons/icon_user.svg';
import IconArrow from '@/assets/icons/icon_arrow_right_black.svg';
import IconArrowColor from '@/assets/icons/icon_arrow_right_color.svg';
import IconAddress from '@/assets/icons/icon_address_black.svg';
import IconAddressColor from '@/assets/icons/icon_address_color.svg';
import IconBag from '@/assets/icons/icon_bag.svg';
import IconBagColor from '@/assets/icons/icon_bag_color.svg';
import IconOff from '@/assets/icons/icon_off_black.svg';
import IconTrash from '@/assets/icons/icon_papelera_black.svg';

import { Button, Title } from '@/components/ui';
import DeleteAccountModal from '@/components/modals/DeleteUser';

// import ContactInfoPage from '@/pages/ContactInfo';
// import AddressListPage from '@/pages/AddressList';
// import OrdersPage from '@/pages/Orders';

const ProfilePage = () => {
    const { signOut, isRehydrating, user, fetchUser } = useStore(state => ({
        signOut: state.signOut,
        isRehydrating: state.isRehydrating,
        user: state.user,
        fetchUser: state.fetchUser,
    }));    
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedSection, setSelectedSection] = useState('myData');
    const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
        const path = location.pathname.split('/').pop();
        setSelectedSection(path || 'myData');
    }, [user, fetchUser, location.pathname]);

    if (isRehydrating || !user) {
        return <p>Loading user data...</p>;
    }

    return (
        <div>
            <Title>Profile</Title>
            <div className="flex w-full h-full">
                <div className="bg-white_color ml-[30px] max-w-[315px] h-[245px] p-[40px] flex flex-col justify-center items-start w-full">
                    <div className='w-full space-y-[40px]'>
                        <Link 
                            className={`flex items-center w-full ${selectedSection === 'myData' ? 'text-primary_800_color' : ''}`} 
                            to="myData"
                            onClick={() => setSelectedSection('myData')}
                        >
                            <img src={selectedSection === 'myData' ? IconUserColor : IconUser} alt="User Icon" />
                            <span className="ml-[20px]">My Data</span>
                            <img src={selectedSection === 'myData' ? IconArrowColor : IconArrow} alt="Arrow Icon" className="ml-auto"/>
                        </Link>
                        <Link 
                            className={`flex items-center w-full ${selectedSection === 'addresses' ? 'text-primary_800_color' : ''}`} 
                            to='addresses'
                            onClick={() => setSelectedSection('addresses')}
                        >
                            <img src={selectedSection === 'addresses' ? IconAddressColor : IconAddress} alt="Address Icon" />
                            <span className="ml-[20px]">My addresses</span>
                            <img src={selectedSection === 'addresses' ? IconArrowColor : IconArrow} alt="Arrow Icon" className="ml-auto"/>
                        </Link>
                        <Link 
                            className={`flex items-center w-full ${selectedSection === 'orders' ? 'text-primary_800_color' : ''}`} 
                            to='orders'
                            onClick={() => setSelectedSection('orders')}
                        >
                            <img src={selectedSection === 'orders' ? IconBagColor : IconBag} alt="Bag Icon" />
                            <span className="ml-[20px]">My orders</span>
                            <img src={selectedSection === 'orders' ? IconArrowColor : IconArrow} className="ml-auto"/>
                        </Link>
                    </div>
                </div>
                <main className="bg-white_color h-[740px] ml-[40px] mr-[40px] w-full">
                    <Outlet />
                </main>
            </div>
            <div className='flex flex-col flex-nowrap content-start justify-end items-start align-center ml-[30px] max-w-[315px] h-[100px]'>
                <Button onClick={() => signOut(navigate)} size="large" extraClass='flex m-auto mt-[10px] justify-start items-center aling-left pl-[15px]'>
                    <img src={IconOff} alt="Plus Icon" className="mr-[28px]" />
                    Sign off
                </Button>
                <Button onClick={() => setDeleteAccountModalOpen(true)} size="large" bgColor="bg-red_color" extraClass='flex m-auto mt-[10px] justify-start items-center aling-left pl-[15px] bg-red-500'>
                    <img src={IconTrash} alt="trash Icon" className="mr-[28px]" />
                    Delete account
                </Button> 
                {deleteAccountModalOpen && (
                    <DeleteAccountModal
                        isOpen={deleteAccountModalOpen}
                        close={() => setDeleteAccountModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
