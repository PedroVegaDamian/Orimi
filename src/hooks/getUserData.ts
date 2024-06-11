import { create } from "zustand";
import { PublicUserData } from '@/models/user';
import { UserData } from '@/models/user';

type AuthUser = {
    logged: boolean;
    user: PublicUserData | null;
    changeLogged: () => void;
    changeUser: (newUser?: PublicUserData | null) => void; 
    setUser: (newUser: UserData) => void;
}

export const userAuth = create<AuthUser>((set) => ({
    logged: false,
    user: null,
    changeLogged: () => {
        set((state) => ({ ...state, logged: !state.logged }));
    },
    changeUser: (newUser?: PublicUserData | null) => {
        set((state) => ({ ...state, user: newUser }));
    },
    setUser: (newUser: UserData) => {
        set((state) => ({ ...state, user: newUser }));
    },
}));
