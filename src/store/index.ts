import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { UserData, Address } from '@/models/user';
import { getCurrentUser } from '@/services/getUsers';
import { signOut as firebaseSignOut } from '@/services/signOut';
import { NavigateFunction } from 'react-router-dom';
import { updateAddress as updateAddressService } from '@/services/updateAddress';
import { deleteAddressService } from '@/services/deleteAddress';

interface StoreState {
  user: UserData | null;
  isAuthenticated: boolean;
  isRehydrating: boolean;
  selectedAddressId: string | null;
  editModalOpen: boolean;
  deleteModalOpen: boolean;
  defaultAddress: Address | null;
  setUser: (user: UserData) => void;
  clearUser: () => void;
  finishRehydration: () => void;
  signOut: (navigate: NavigateFunction) => Promise<void>;
  fetchUser: () => Promise<UserData | null>;
  setSelectedAddressId: (id: string | null) => void;
  setEditModalOpen: (open: boolean) => void;
  setDeleteModalOpen: (open: boolean) => void;
  setDefaultAddress: (address: Address | null) => void;
  updateAddress: (addressId: string, addressData: Omit<Address, 'id'>) => Promise<void>;
  deleteAddress: (userId: string, addressId: string) => Promise<void>;
}

interface StorageValue {
  state: StoreState;
}

const storage: PersistStorage<StoreState> = {
  getItem: async (key: string): Promise<StorageValue | null> => {
    const item = localStorage.getItem(key);
    return item ? { state: JSON.parse(item) as StoreState } : null;
  },
  setItem: async (key: string, value: StorageValue) => {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  },

  removeItem: async (key: string) => {
    localStorage.removeItem(key);
  }
};

const useStore = create<StoreState>()(persist((set, get) => ({
  user: null,
  isAuthenticated: false,
  isRehydrating: true,
  selectedAddressId: null,
  editModalOpen: false,
  deleteModalOpen: false,
  defaultAddress: null,
  setUser: (user: UserData) => set({ user, isAuthenticated: !!user }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
  finishRehydration: () => set({ isRehydrating: false }),
  signOut: async (navigate: NavigateFunction) => {
    await firebaseSignOut(navigate);
    get().clearUser();
    navigate('/login');
  },
  fetchUser: async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        set({ user, isAuthenticated: true, isRehydrating: false });
        return user;
      } else {
        set({ isRehydrating: false });
        return null;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      set({ isRehydrating: false });
      return null;
    }
  },
  setSelectedAddressId: (id: string | null) => set({ selectedAddressId: id }),
  setEditModalOpen: (open: boolean) => set({ editModalOpen: open }),
  setDeleteModalOpen: (open: boolean) => set({ deleteModalOpen: open }),
  setDefaultAddress: (address: Address | null) => set({ defaultAddress: address }),
  updateAddress: async (addressId: string, addressData: Omit<Address, 'id'>) => {
    if (!addressId || typeof addressId !== 'string' || !addressData || typeof addressData !== 'object') {
      console.error('Invalid types for addressId or addressData');
      return;
    }

    const currentAddresses = get().user?.addresses ?? [];
    const updatedAddresses = currentAddresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId ? addressData.isDefault : false
    }));

    set((state: StoreState) => ({
      ...state,
      user: { ...state.user!, addresses: updatedAddresses }
    }));

    await updateAddressService(addressId, addressData);
  },
  deleteAddress: async (userId: string, addressId: string) => {
    if (!userId || typeof userId !== 'string' || !addressId || typeof addressId !== 'string') {
      console.error('Invalid types for userId or addressId');
      return;
    }
    await deleteAddressService(userId, addressId);
    const currentAddresses = get().user?.addresses ?? [];
    const remainingAddresses = currentAddresses.filter(addr => addr.id !== addressId);
    set((state: StoreState) => ({
      ...state,
      user: { ...state.user!, addresses: remainingAddresses }
    }));
  },
}), {
  name: 'user-store',
  storage: storage
}));

export { useStore };