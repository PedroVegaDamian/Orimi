import { useEffect, useState, useCallback } from 'react';
import { useStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { UserData, Address } from '@/models/user';

import IconUser from '@/assets/icons/icon_user_black.svg';
import IconArrow from '@/assets/icons/icon_arrow_right_black.svg';
import IconAddress from '@/assets/icons/icon_address_black.svg';
import IconBag from '@/assets/icons/icon_bag.svg';
import IconPencil from '@/assets/icons/icon_pencil_black.svg';
import IconEyeBlack from '@/assets/icons/icon_eye_black.svg';
import IconPlusLineBlack from '@/assets/icons/icon_plus_line_black.svg';
import IconOff from '@/assets/icons/icon_off_black.svg';

import { Button, Title } from '@/components/ui';

import EditUserModals from '@/components/modals/EditUser';
import EditAddressModal from '@/components/modals/EditAddress';
import NewAddressModal from '@/components/modals/NewAddress';


import { sendResetPasswordEmail } from '@/services/passwordReset';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData>({
        id: '', // Suponiendo que se cargará o creará más adelante
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        addresses: [] // Inicializa como arreglo vacío si aún no hay direcciones
    });
        const { isAuthenticated, signOut, isRehydrating, fetchUser } = useStore(state => ({
        isAuthenticated: state.isAuthenticated,
        signOut: state.signOut,
        isRehydrating: state.isRehydrating,
        fetchUser: state.fetchUser,
        user: state.user 
    }));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editAddressModalOpen, setEditAddressModalOpen] = useState(false);
    const [newAddressModalOpen, setNewAddressModalOpen] = useState(false);
    const [selectedAddress] = useState<Address | null>(null);
    
    const handleModalClose = () => {
        setEditAddressModalOpen(false);
        setIsModalOpen(false);
        fetchUser().then(freshData => {
            if (freshData) {
                setUserData(freshData);
                console.log("Datos refrescados desde Firebase:", freshData);
            }
            }).catch(error => {
            console.error("Error fetching updated data from Firebase:", error);
            });
    };

    

    // Cargar los datos del usuario
    useEffect(() => {
        if (isRehydrating) {
            fetchUser().then((fetchedUser) => {
                if (fetchedUser) {
                    setUserData(fetchedUser);
                } else {
                    console.log("No user data fetched");
                }
            }).catch(error => {
                console.error("Failed to fetch user:", error);
            });
        }
    }, [isRehydrating, fetchUser]);
    

    // Bloqueo y desbloqueo del scroll //TODO: cuando abro el de direcciones se bloque al cerrarlo
    useEffect(() => {
        const originalStyle = document.body.style.overflow; 
        if (isModalOpen || editAddressModalOpen || newAddressModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = originalStyle;
        }
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isModalOpen, editAddressModalOpen, newAddressModalOpen]);

    const handleResetPassword = useCallback(async () => {
        if (userData && userData.email) {
            try {
                await sendResetPasswordEmail(userData.email);
                console.log("Correo de restablecimiento enviado a:", userData.email);
            } catch (error) {
                console.error("Error al enviar correo de restablecimiento:", error);
            }
        } else {
            console.log("No se pudo obtener el correo electrónico del usuario.");
        }
    }, [userData]);

    //Direcciones
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const handleAddressClick = (address: Address) => {
    //     setSelectedAddress(address);
    //     setEditAddressModalOpen(true);
    // };

    const handleUpdateAddress = (updatedAddress: Address) => {
        if (!userData) return;
        
        const updatedAddresses = userData.addresses.map(addr =>
            addr.id === updatedAddress.id ? updatedAddress : addr
        );
    
        // Actualizar el estado local
        setUserData({...userData, addresses: updatedAddresses});
    
        setEditAddressModalOpen(false); // Cerrar el modal tras la actualización
    };
    
    const handleAddNewAddress = (newAddress: Address) => {
        if (!userData || !Array.isArray(userData.addresses)) {
            console.error("No se pueden manejar las direcciones, ya que userData o userData.addresses no están definidos correctamente.");
            return;
        }
    
        const newAddresses = [...userData.addresses, newAddress];
    
        // máximo de 3 direcciones
        // if (newAddresses.length > 3) {
        //     console.error("No se pueden añadir más de 3 direcciones");
        //     return;
        // }
    
        // Actualizar el estado local
        setUserData({...userData, addresses: newAddresses});
    
        //setNewAddressModalOpen(false); // Cerrar el modal tras añadir la dirección
    };

    


    //Carga de datos del usuario
    if (isRehydrating || !userData) {
        return <p>Loading user data...</p>;
    }

    return (
        <div>
            <Title>Profile</Title>
            <div className="flex w-full h-full">
                <div className="bg-white_color ml-[30px] max-w-[315px] h-[245px] p-[40px] flex flex-col justify-center items-start w-full">
                    <ul className='w-full space-y-[40px]'>
                        //TODO: cuando se haga click en el li que te lleve al titulo adecuado
                        <li className='flex items-center w-full'>
                            <img src={IconUser} alt="User Icon" />
                            <span className="ml-[20px]">My Data</span>
                            <img src={IconArrow} alt="Arrow Icon" className="ml-auto"/>
                        </li>
                        <li className='flex items-center w-full'>
                            <img src={IconAddress} alt="Address Icon" />
                            <span className="ml-[20px]">My addresses</span>
                            <img src={IconArrow} alt="Arrow Icon" className="ml-auto"/>
                        </li>
                        <li className='flex items-center w-full'>
                            <img src={IconBag} alt="Bag Icon" />
                            <span className="ml-[20px]">My orders</span>
                            <img src={IconArrow} alt="Arrow Icon" className="ml-auto"/>
                        </li>
                    </ul>
                </div>
                <main className="bg-white_color h-[740px] ml-[40px] mr-[40px] w-full">
                    <section>
                        <Title textAlignment="left" className="ml-[96px]">Contact information</Title>
                        <hr className='border-grey_color w-[90%] mx-auto'/>
                        <div className="w-[90%] mx-auto pt-[24px] pb-[24px] flex flex-nowrap justify-between itemen-stretch direcction-row ">
                            <div>
                                { isAuthenticated  ? (
                                    <>
                                        <p>Name: {userData .firstName} {userData .lastName}</p>
                                        <p>Email: {userData .email}</p>
                                        <p>Phone: {userData .phone}</p>
                                    </>
                                    ) : (
                                    // Si el usuario no está disponible, mostrar un mensaje de carga
                                        <p>'Loading user...'</p>
                                )}
                            </div>

                            <div>
                                <button onClick={() => setIsModalOpen(true)} className="flex justify-end items-center">
                                    <img src={IconPencil} alt="Pencil Icon" className="mr-[10px]" />
                                    <span>Edit</span>
                                </button>
                                {isModalOpen && userData && (
                                    <EditUserModals 
                                        isOpen={isModalOpen} 
                                        close={() => handleModalClose()}
                                        user={userData}
                                    />
                                
                                )}                                
                                <button onClick={handleResetPassword} className="flex justify-end items-center">
                                    <img src={IconPencil} alt="Pencil Icon" className="mr-[10px]" />
                                    <span>Change password</span> 
                                </button>
                            </div>

                        </div> 
                        <hr className='border-grey_color w-[90%] mx-auto'/>
                    </section>
                    <section>
                        <Title textAlignment="left" className="ml-[96px]">Address list</Title>
                        <hr className='border-grey_color w-[90%] mx-auto'/>
                        <div className="w-[90%] mx-auto pt-[24px] pb-[24px] flex flex-nowrap justify-between itemen-stretch direcction-row ">
                            <div>
                                {userData && userData.addresses && userData.addresses.length > 0 ? (
                                    userData.addresses.map((address) => (
                                            <div key={address.id}>
                                                {/* <input
                                                    type="radio"
                                                    name="defaultAddress"
                                                    checked={selectedAddress?.id === address.id}
                                                    onChange={() => setSelectedAddress(address)}
                                                /> */}
                                                <p>{address.street}, {address.city}, {address.zip}</p>
                                            </div>
                                        ))
                                        //</div>{selectedAddress && <p>Default shipping address: {selectedAddress.street}, {selectedAddress.city}</p>}
                                    // </form>
                                ) : (
                                    <p>You do not have any addresses yet. Add one.</p>
                                )}
                            </div>
                            <div>
                                //TODO:Editar direccion
                                <button onClick={() => setEditAddressModalOpen(true)} className="flex justify-end items-center">
                                    <img src={IconPencil} alt="Pencil Icon" className="mr-[10px]" />
                                    <span>Edit</span>
                                </button>
                                {editAddressModalOpen && selectedAddress && (
                                    <EditAddressModal
                                        isOpen={editAddressModalOpen}
                                        address={selectedAddress}
                                        updateAddress={handleUpdateAddress}
                                        close={() => setEditAddressModalOpen(false)}
                                    />
                                )}
                                //TODO:Añadir nueva direccion
                                <button onClick={() => setNewAddressModalOpen(true)} className="flex justify-end items-center">
                                    <img src={IconPlusLineBlack} alt="Plus Icon" className="mr-[10px]" />
                                    <span>Add new address</span>
                                </button>
                                {newAddressModalOpen && (
                                    <NewAddressModal 
                                        isOpen={newAddressModalOpen}
                                        close={() => handleModalClose()}
                                        user={userData}
                                    />
                                )}
                            </div>
                        </div>
                        <hr className='border-grey_color w-[90%] mx-auto'/>
                    </section>
                    <section>
                        <Title textAlignment="left" className="ml-[96px]">My Orders</Title>
                        <hr className='border-grey_color w-[90%] mx-auto'/>
                        <div className="w-[90%] mx-auto pt-[24px] pb-[24px] flex flex-nowrap justify-between itemen-stretch direcction-row ">
                            <div>//TODO: no tengo los datos del carrito
                                <p>Order: numero-pedido</p>
                                <p>Date: fecha</p>
                            </div>
                            <div>
                                <p>Price: <span className='text-primary_800_color font-bold'>$80,99</span></p>
                            </div>
                        </div>
                        <div className='flex'>
                            <a href="/order" className='flex m-auto'>See your orders <img src={IconEyeBlack} alt="Plus Icon" className="ml-[10px]" /></a>
                        </div>
                        <hr className='border-grey_color w-[90%] mx-auto'/>
                    </section>
                </main>
            </div>
            <div className='flex flex-col align-center justify-center items-center ml-[30px] max-w-[315px] h-[100px]'>
                <Button onClick={() => signOut(navigate)} size="large" extraClass='flex m-auto mt-[10px] justify-start items-center aling-left pl-[15px]'><img src={IconOff} alt="Plus Icon" className="mr-[28px]" />Sign off</Button>
                //TODO: boton para borrar cuenta
                {/* <Button onClick = {() => deleteAccountModals(true)} size="large" bgColor="bg-red_color" extraClass='flex m-auto mt-[10px] justify-start items-center aling-left pl-[15px] bg-red-500'><img src={IconTrash} alt="Plus Icon" className="mr-[28px]" />Delete account</Button> */}
                {/* <deleteAccountModals isOpen={isdeleteAccountModals} close={() => setdeleteAccountModals(false)} /> */}

            </div>
        </div>
    );
}