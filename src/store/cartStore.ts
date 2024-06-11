import { CartState } from '@/models';
import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { useUserStore } from '@/store/userStore';

const getCartKey = (userId: string | undefined) => `CART_ITEMS_${userId}`;

export const useCartStore = create<CartState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        total: 0,
        cart: [],
        increment: (id: string | undefined) =>
          set(state => ({
            cart: state.cart.map(product =>
              product.id === id && product.stock > 0
                ? {
                    ...product,
                    quantity: product.quantity + 1 || 1,
                    stock: product.stock - 1
                  }
                : product
            )
          })),
        decrement: (id: string | undefined) =>
          set(state => ({
            cart: state.cart.map(product =>
              product.id === id && product.quantity > 0
                ? {
                    ...product,
                    quantity: product.quantity - 1 || 1,
                    stock: product.stock + 1
                  }
                : product
            )
          })),
        removeProduct: (slug: string | undefined) =>
          set(state => ({
            cart: state.cart.filter(product => product.slug !== slug)
          })),
        multiply: () => {
          set(state => ({
            cart: state.cart.map(product => ({
              ...product,
              subtotal: product.price * product.quantity
            }))
          }))
        },
        totalSum: () => {
          set(state => {
            const total = state.cart.reduce(
              (sum, product) => sum + (product.subtotal ?? product.price),
              0
            )
            return { ...state, total }
          })
        },
        clearCart: () => {
          set({ cart: [], total: 0 });
        },
        isStock: (id: string | undefined) => {
          set(state => ({
            cart: state.cart.map(product =>
              product.id === id
                ? { ...product, isStock: product.stock > 0 }
                : { ...product, isStock: false }
            ),
          }));
        },
        saveCart: (userId: string | undefined) => {
          if (userId) {
            const state = get();
            localStorage.setItem(getCartKey(userId), JSON.stringify(state.cart));
          }
        },
        loadCart: (userId: string | undefined) => {
          if (userId) {
            const savedCart = localStorage.getItem(getCartKey(userId));
            if (savedCart) {
              const parsedCart = JSON.parse(savedCart);
              set({ cart: parsedCart });
              get().totalSum();
            }
          }
        },
      }),
      { name: 'CART_STORE' }
    )
  )
);

useUserStore.subscribe(
  (state, prevState) => {
    const userId = state.user?.id;
    const cartStore = useCartStore.getState();

    if (!userId && prevState.user?.id) {
      cartStore.saveCart(prevState.user.id);
      cartStore.clearCart();
    }

    if (userId) {
      setTimeout(() => {
        cartStore.loadCart(userId);
      }, 0);
    }
  }
);


