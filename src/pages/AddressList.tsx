import { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store';
import { Title } from '@/components/ui';
import EditAddressModal from '@/components/modals/EditAddress';
import NewAddressModal from '@/components/modals/NewAddress';
import DeleteAddressModal from '@/components/modals/DeleteAddress';
import { fetchAddressesFromFirebase } from '@/services/fetchAddresses';
import { updateAddress } from '@/services/updateAddress';
import { addAddressToFirebase } from '@/services/addAddresses';
import { deleteAddressService } from '@/services/deleteAddress';
import { Address } from '@/models/user';

import IconPencil from '@/assets/icons/icon_pencil_black.svg';
import IconTrash from '@/assets/icons/icon_papelera_black.svg';
import IconPlusLineBlack from '@/assets/icons/icon_plus_line_black.svg';

import useBodyScrollLock from '@/hooks/useBodyScrollLock';

const AddressListPage = () => {
    const { user, fetchUser, setDefaultAddress, setSelectedAddressId } = useStore(state => ({
        user: state.user,
        fetchUser: state.fetchUser,
        setDefaultAddress: state.setDefaultAddress,
        setSelectedAddressId: state.setSelectedAddressId,
    }));

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [editAddressModalOpen, setEditAddressModalOpen] = useState(false);
    const [deleteAddressModalOpen, setDeleteAddressModalOpen] = useState(false);
    const [newAddressModalOpen, setNewAddressModalOpen] = useState(false);
    const [isFetchingAddresses, setIsFetchingAddresses] = useState(true);

    const isModalOpen = editAddressModalOpen || deleteAddressModalOpen || newAddressModalOpen;
    useBodyScrollLock(isModalOpen);

    useEffect(() => {
        if (user && user.id) {
            fetchAddressesFromFirebase(user.id).then(addresses => {
                setAddresses(addresses);
                const defaultAddress = addresses.find(addr => addr.isDefault);
                if (defaultAddress) {
                    setSelectedAddress(defaultAddress);
                    setDefaultAddress(defaultAddress);
                }
            }).catch(error => {
                console.error('Error fetching addresses:', error);
            }).finally(() => {
                setIsFetchingAddresses(false);
            });
        }
    }, [user, setDefaultAddress]);

    const handleEditAddress = useCallback(async (addressId: string, address: Partial<Address>) => {
        if (!user) return;
            const updatedAddresses = addresses.map(addr => addr.id === addressId
            ? { ...addr, ...address, isDefault: address.isDefault ?? false }
            : { ...addr, isDefault: address.isDefault ? false : addr.isDefault }
        );
    
        setAddresses(updatedAddresses);
    
        const completeAddress: Address = {
            id: addressId,
            company: address.company || '',
            street: address.street || '',
            city: address.city || '',
            state: address.state || '',
            zip: address.zip || '',
            country: address.country || '',
            notes: address.notes || '',
            isDefault: address.isDefault ?? false,
            invoice: address.invoice || false,
        };
    
        await updateAddress(user.id, addressId, completeAddress);
        
        // Actualizar todas las demás direcciones en Firestore
        if (completeAddress.isDefault) {
            const promises = updatedAddresses.map(addr =>
                addr.id !== addressId ? updateAddress(user.id, addr.id, { ...addr, isDefault: false }) : Promise.resolve()
            );
            await Promise.all(promises);
        }
    
        fetchUser().then(freshData => {
            if (freshData) {
                setAddresses(freshData.addresses);
            }
        }).catch(error => {
            console.error('Error updating address:', error);
        });
        setEditAddressModalOpen(false);
    }, [fetchUser, user, addresses]);

    const handleDeleteAddress = useCallback(async (addressId: string) => {
        if (!user) return;
    
        await deleteAddressService(user.id, addressId);
    
        const remainingAddresses = addresses.filter(addr => addr.id !== addressId);
        if (remainingAddresses.length > 0) {
            if (!remainingAddresses.some(addr => addr.isDefault)) {
                remainingAddresses[0].isDefault = true;
                await updateAddress(user.id, remainingAddresses[0].id, remainingAddresses[0]);
                setDefaultAddress(remainingAddresses[0]);
            }
        }
    
        setAddresses(remainingAddresses);
    
        fetchUser().then(freshData => {
            if (freshData) {
                setAddresses(freshData.addresses);
            }
        }).catch(error => {
            console.error('Error deleting address:', error);
        });
    
        setDeleteAddressModalOpen(false);
    }, [fetchUser, user, addresses, setDefaultAddress]);

    const handleNewAddress = useCallback(async (address: Partial<Address>) => {
        if (!user) return;

        if (addresses.length === 0) {
            address.isDefault = true;
        } else if (address.isDefault) {
            setAddresses(prevAddresses => prevAddresses.map(addr => ({...addr, isDefault: false})));
        }

        const newAddress: Address = {
            id: `address-${Date.now()}`,
            company: address.company || '',
            street: address.street || '',
            city: address.city || '',
            state: address.state || '',
            zip: address.zip || '',
            country: address.country || '',
            notes: address.notes || '',
            isDefault: address.isDefault ?? false,
            invoice: address.invoice || false,
        };

        await addAddressToFirebase(user.id, newAddress);

        if (address.isDefault) {
            const promises = addresses.map(addr =>
                addr.id !== newAddress.id ? updateAddress(user.id, addr.id, { ...addr, isDefault: false }) : Promise.resolve()
            );
            await Promise.all(promises);
        }

        fetchUser().then(freshData => {
            if (freshData) {
                setAddresses(freshData.addresses);
            }
        }).catch(error => {
            console.error('Error adding address:', error);
        });
        setNewAddressModalOpen(false);
    }, [fetchUser, user, addresses]);

    const handleSetDefaultAddress = async (addressId: string) => {
        if (!user) return;
    
        const updatedAddresses = addresses.map((address) =>
            address.id === addressId ? { ...address, isDefault: true } : { ...address, isDefault: false }
        );
        setAddresses(updatedAddresses);
    
        try {
            const selectedAddress = updatedAddresses.find(address => address.id === addressId);
    
            if (selectedAddress) {
                for (const addr of updatedAddresses) {
                    await updateAddress(user.id, addr.id, { ...addr, isDefault: addr.id === addressId });
                }
                setDefaultAddress(selectedAddress);
            }
        } catch (error) {
            console.error('Error setting default address:', error);
        }
    };    

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const addressId = event.target.value;
        handleSetDefaultAddress(addressId);
    };
    

    return (
        <section>
            <Title>Address List</Title>
            <hr className='border-grey_color w-[90%] mx-auto'/>
            <div className="flex flex-nowrap justify-between items-start content-start w-[90%] mx-auto pt-[24px] pb-[24px]">
                <ul className='max-w-[400px]'>
                    {isFetchingAddresses ? (
                        <p>Loading addresses...</p>
                    ) : addresses.length > 0 ? (
                        addresses.map(address => (
                            <div key={address.id} className={address.isDefault ? 'border-primary_800_color border-2 border-radius-[10px]' : ''}>
                                <input
                                    type="radio"
                                    name="defaultAddress"
                                    value={address.id}
                                    checked={address.isDefault}
                                    onChange={onChange}
                                    className={address.isDefault ? 'text-primary_800_color ring-primary_800_color focus:ring-primary_800_color' : ''}
                                />
                                <p>
                                    {address.company && `${address.company}, `}
                                    {address.street}, 
                                    {address.city}, 
                                    {address.state},
                                    {address.zip},
                                    {address.country}
                                    {address.notes && ` (${address.notes})`}
                                </p>
                                {address.isDefault && <p>Default shipping</p>}
                                <div className='flex m-6'>
                                    <button onClick={() => {
                                        setSelectedAddressId(address.id);
                                        setSelectedAddress(address);
                                        setEditAddressModalOpen(true);
                                    }} className="flex items-center">
                                        <img src={IconPencil} alt="Pencil Icon" className="mr-[10px]" />
                                        <span className='mr-[10px]'>Edit</span>
                                    </button>
                                    <button onClick={() => {
                                        setSelectedAddressId(address.id);
                                        setSelectedAddress(address);
                                        setDeleteAddressModalOpen(true);
                                    }} className="flex items-center">
                                        <img src={IconTrash} alt="Trash Icon" className="mr-[10px]" />
                                        <span>Delete</span>
                                    </button>
                                    {editAddressModalOpen && selectedAddress && (
                                        <EditAddressModal
                                            isOpen={editAddressModalOpen}
                                            address={selectedAddress}
                                            addresses={addresses} 
                                            updateAddress={handleEditAddress}
                                            close={() => setEditAddressModalOpen(false)}
                                        />
                                    )}
                                    { deleteAddressModalOpen && selectedAddress && (
                                        <DeleteAddressModal
                                            isOpen={deleteAddressModalOpen}
                                            addressId={selectedAddress.id}
                                            onDeleteAddress={handleDeleteAddress}
                                            close={() => setDeleteAddressModalOpen(false)}
                                        />
                                    )}
                                </div>
                                
                            </div>
                        ))
                    ) : (
                        <p>You do not have any addresses yet. Add one.</p>
                    )}
                </ul>
                <button onClick={() => setNewAddressModalOpen(true)} className="flex items-center">
                    <img src={IconPlusLineBlack} alt="Plus Icon" className="mr-[10px]" />
                    <span>Add New Address</span>
                </button>
                {newAddressModalOpen && (
                    <NewAddressModal
                        isOpen={newAddressModalOpen}
                        close={() => setNewAddressModalOpen(false)}
                        handleNewAddress={handleNewAddress}
                        existingAddresses={addresses}
                        updateAddress={handleEditAddress}
                    />
                )}
            </div>
            <hr className='border-grey_color w-[90%] mx-auto'/>
        </section>
    );
};

export default AddressListPage;
