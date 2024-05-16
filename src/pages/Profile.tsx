import { useEffect, useState, useCallback } from 'react';
import { useStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { UserData, Address } from '@/models/user';
import { db } from '@/firebase';
import { doc, getDoc, getDocs, collection, runTransaction } from "firebase/firestore";

import IconUser from '@/assets/icons/icon_user_black.svg';
import IconArrow from '@/assets/icons/icon_arrow_right_black.svg';
import IconAddress from '@/assets/icons/icon_address_black.svg';
import IconBag from '@/assets/icons/icon_bag.svg';
import IconPencil from '@/assets/icons/icon_pencil_black.svg';
import IconEyeBlack from '@/assets/icons/icon_eye_black.svg';
import IconPlusLineBlack from '@/assets/icons/icon_plus_line_black.svg';
import IconOff from '@/assets/icons/icon_off_black.svg';
import IconTrash from '@/assets/icons/icon_papelera_black.svg'

import { Button, Title } from '@/components/ui';

import EditUserModals from '@/components/modals/EditUser';
import EditAddressModal from '@/components/modals/EditAddress';
import NewAddressModal from '@/components/modals/NewAddress';
import DeleteAddressModal from '@/components/modals/DeleteAddress';


import { sendResetPasswordEmail } from '@/services/passwordReset';
import { fetchAddressesFromFirebase } from '@/services/fetchAddresses';
import { addAddressToFirebase } from '@/services/addAddresses'; 
// import { deleteAddress } from '@/services/deleteAddress';
// import { updateAddress } from '@/services/updateAddress';

export const ProfilePage = () => {
    // const { setEditModalOpen, setDeleteModalOpen, setSelectedAddressId, deleteAddress, updateAddress } = useStore();
    const { isAuthenticated, signOut, isRehydrating, fetchUser, updateAddress, deleteAddress, setEditModalOpen, setDeleteModalOpen, setSelectedAddressId, defaultAddress, setDefaultAddress } = useStore(state => ({
        isAuthenticated: state.isAuthenticated,
        signOut: state.signOut,
        isRehydrating: state.isRehydrating,
        fetchUser: state.fetchUser,
        user: state.user,
        updateAddress: state.updateAddress,
        deleteAddress: state.deleteAddress,
        setEditModalOpen: state.setEditModalOpen,
        setDeleteModalOpen: state.setDeleteModalOpen,
        setSelectedAddressId: state.setSelectedAddressId,
        defaultAddress: state.defaultAddress,
        setDefaultAddress: state.setDefaultAddress,
    }));
    const navigate = useNavigate();
    const emptyAddress: Address = {
        id: '',
        company: '',  
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        notes: '',
        isDefault: false,
        invoice: false
    };
    const [userData, setUserData] = useState<UserData>({
        id: '', 
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        addresses: [emptyAddress]
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [editAddressModalOpen, setEditAddressModalOpen] = useState(false);
    const [deleteAddressModalOpen, setDeleteAddressModalOpen] = useState(false);
    const [newAddressModalOpen, setNewAddressModalOpen] = useState(false);
    
    const handleModalClose = () => {
        setIsModalOpen(false);
        setNewAddressModalOpen(false);
        setDeleteAddressModalOpen(false);
        setEditAddressModalOpen(false);
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
                    // Establecer la dirección por defecto
                    const defaultAddress = fetchedUser.addresses.find(address => address.isDefault);
                    setDefaultAddress(defaultAddress || null);
                } else {
                    console.log("No user data fetched");
                }
            }).catch(error => {
                console.error("Failed to fetch user:", error);
            });
        }
    }, [isRehydrating, fetchUser, setDefaultAddress]);

    // Función para cargar las direcciones del usuario
    useEffect(() => {
        if (userData.id) {
            fetchAddressesFromFirebase(userData.id)
                .then(addresses => {
                    console.log("Addresses fetched:", addresses);
                    setUserData(currentData => ({ ...currentData, addresses }));
                    const defaultAddress = addresses.find(address => address.isDefault);
                    if (defaultAddress) {
                        setSelectedAddress(defaultAddress);
                        setDefaultAddress(defaultAddress); // Asegurarse de establecer la dirección por defecto
                    }
                })
                .catch(error => {
                    console.error('Error fetching addresses:', error);
                });
        }
    }, [userData.id, setDefaultAddress]);

   // Bloqueo y desbloqueo del scroll 
    useEffect(() => {
        const originalStyle = document.body.style.overflow;
        if (isModalOpen || editAddressModalOpen || newAddressModalOpen || deleteAddressModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = originalStyle;
        }
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isModalOpen, editAddressModalOpen, newAddressModalOpen, deleteAddressModalOpen]);

    // Enviando correo de restablecer contraseña
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

    const handleEditAddress = useCallback((addressId: string, address: Partial<Address>) => {
        const completeAddress: Address = {
            id: addressId,
            company: address.company || '',
            street: address.street || '',
            city: address.city || '',
            state: address.state || '',
            zip: address.zip || '',
            country: address.country || '',
            notes: address.notes || '',
            isDefault: address.isDefault || false,
            invoice: address.invoice || false,
        };
        updateAddress(addressId, completeAddress);
        setEditAddressModalOpen(false);
    }, [updateAddress, setEditAddressModalOpen]);
    
    const handleNewAddress = useCallback(async (address: Partial<Address>) => {
        if (address.isDefault) {
            const updatedAddresses = userData.addresses.map(addr => ({
                ...addr,
                isDefault: false,
            }));
            for (const addr of updatedAddresses) {
                const addressRef = doc(db, 'addresses', addr.id);
                const docSnap = await getDoc(addressRef);
    
                if (docSnap.exists()) {
                    await updateAddress(addr.id, {
                        ...addr,
                        isDefault: addr.isDefault,
                    });
                } else {
                    console.error(`No document to update: ${addr.id}`);
                }
            }
        }
        const completeAddress: Address = {
            ...address,
            id: `id-${Date.now()}`, 
            company: address.company || '',
            street: address.street || '',
            city: address.city || '',
            state: address.state || '',
            zip: address.zip || '',
            country: address.country || '',
            notes: address.notes || '',
            isDefault: address.isDefault || false,
            invoice: address.invoice || false,
        };
        await addAddressToFirebase(userData.id, completeAddress); 
        fetchUser().then(freshData => {
            if (freshData) {
                setUserData(freshData);
                console.log("Datos refrescados desde Firebase:", freshData);
            }
        }).catch(error => {
            console.error("Error fetching updated data from Firebase:", error);
        });
    }, [userData.addresses, userData.id, updateAddress, fetchUser]);

    const handleDeleteAddress = useCallback((addressId: string) => {
        deleteAddress(addressId);
        setDeleteAddressModalOpen(false);
    }, [deleteAddress, setDeleteAddressModalOpen]);

    const handleSetDefaultAddress = async (addressId: string) => {
        try {
            const selectedAddressRef = doc(db, 'addresses', addressId);
            const selectedDocSnapshot = await getDoc(selectedAddressRef);
    
            if (!selectedDocSnapshot.exists()) {
                console.error(`No document to update: ${addressId}`);
                return;
            }
    
            await runTransaction(db, async (transaction) => {
                // Actualiza la dirección seleccionada para establecerla como predeterminada
                transaction.update(selectedAddressRef, { isDefault: true });
    
                // Obtén todas las direcciones del usuario
                const allAddressesQuerySnapshot = await getDocs(collection(db, 'addresses'));
                
                // Actualiza las otras direcciones para asegurarse de que solo una sea predeterminada
                allAddressesQuerySnapshot.forEach((doc) => {
                    if (doc.id !== addressId && doc.data().isDefault) {
                        transaction.update(doc.ref, { isDefault: false });
                    }
                });
            });
    
            // Actualiza el estado local
            const updatedAddresses = userData.addresses.map((address) =>
                address.id === addressId ? { ...address, isDefault: true } : { ...address, isDefault: false }
            );
    
            setUserData((prevState) => ({
                ...prevState,
                addresses: updatedAddresses,
            }));
    
            setDefaultAddress(updatedAddresses.find((address) => address.id === addressId) || null);
    
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const addressId = event.target.value;
        handleSetDefaultAddress(addressId);
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
                                            <input
                                                type="radio"
                                                name="defaultAddress"
                                                value={address.id}
                                                onChange={onChange}
                                            />
                                                <p>
                                                    {address.company} - 
                                                    {address.street}, 
                                                    {address.city}, 
                                                    {address.state},
                                                    {address.zip},
                                                    {address.country},
                                                    {address.notes},
                                                    {address.isDefault}
                                                </p>
                                                {address.isDefault && <p>Default shipping</p>}
                                                <button onClick={() => {
                                                    setSelectedAddressId(address.id);
                                                    setEditModalOpen(true);
                                                }}>
                                                    <img src={IconPencil} alt="pencil Icon" className="mr-[10px]" /> 
                                                    <span>Edit</span>
                                                </button>
                                                <button onClick={() => {
                                                    setSelectedAddressId(address.id);
                                                    setDeleteModalOpen(true);
                                                }}> 
                                                    <img src={IconTrash} alt="trash Icon" className="mr-[10px]" /> 
                                                    <span>Delete</span>
                                                </button>
                                                {/* Renderiza los modales de editar y borrar */}
                                                {editAddressModalOpen && selectedAddress && (
                                                    <EditAddressModal
                                                        isOpen={editAddressModalOpen}
                                                        address={selectedAddress}
                                                        updateAddress={handleEditAddress}  
                                                        close={() => setEditAddressModalOpen(false)}
                                                    />
                                                )}
                                                {deleteAddressModalOpen && selectedAddress && (
                                                    <DeleteAddressModal
                                                        isOpen={deleteAddressModalOpen}
                                                        addressId={selectedAddress.id}
                                                        onDeleteAddress={handleDeleteAddress}
                                                        close={() => setDeleteAddressModalOpen(false)}
                                                    />
                                                )}
                                            </div>
                                        ))
                                ) : (
                                    <p>You do not have any addresses yet. Add one.</p>
                                )}
                            </div>
                            <div>
                            {userData.addresses.length < 3 && (
                                <button onClick={() => setNewAddressModalOpen(true)} className="flex justify-end items-center">
                                    <img src={IconPlusLineBlack} alt="Plus Icon" className="mr-[10px]" />
                                    <span>Add new address</span>
                                </button>
                            )}
                                {newAddressModalOpen && (
                                    <NewAddressModal  
                                        isOpen={newAddressModalOpen}
                                        close={() => handleModalClose()}
                                        existingAddresses={userData.addresses}
                                        updateAddress={handleEditAddress}
                                        defaultAddress={defaultAddress}
                                        handleNewAddress={handleNewAddress}
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