import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { UserData } from '@/models/user';
import { getCurrentUser } from '@/services/login';
import { signOut as firebaseSignOut } from '@/services/signOut';
import { NavigateFunction } from 'react-router-dom';
//import { fetchAddressesFromFirebase, addAddressToFirebase } from '@/firebase/index';

interface StoreState {
  user: UserData | null;
  isAuthenticated: boolean;
  isRehydrating: boolean;
  setUser: (user: UserData) => void;
  clearUser: () => void;
  finishRehydration: () => void;
  signOut: (navigate: NavigateFunction) => Promise<void>;
  fetchUser: () => Promise<UserData | null>;
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
  setUser: (user: UserData) => set({ user, isAuthenticated: !!user }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
  finishRehydration: () => set({ isRehydrating: false }),
  // addresses: [],
  //   isModalOpen: false,
  //   setModalOpen: isOpen => set({ isModalOpen: isOpen }),
  //   fetchUserAddresses: async () => {
  //       const userId = get().user?.id;
  //       if (userId) {
  //           const addresses = await fetchAddressesFromFirebase(userId);
  //           set({ addresses });
  //       }
  //   },
  //   addAddressToUser: async (address) => {
  //       const userId = get().user?.id;
  //       if (userId) {
  //           const newAddress = await addAddressToFirebase(userId, address);
  //           set(state => ({ addresses: [...state.addresses, newAddress] }));
  //           set({ isModalOpen: false });
  //       }
  //   },
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
        // Si getCurrentUser no lanza un error, pero no retorna un usuario
        set({ isRehydrating: false });
        return null;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      set({ isRehydrating: false });
      return null;
    }
  }
  
}), {
  name: 'user-store',
  storage: storage
}));

export { useStore };
