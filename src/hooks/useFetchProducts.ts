import { useState, useEffect } from 'react';
import { db } from '@/firebase/index';
import { collection, getDocs } from 'firebase/firestore';
import { Product as ProductType } from '@/models';

export const useFetchProducts = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
        setLoading(true);
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = productsSnapshot.docs.map(doc => {
            const data = doc.data() as Omit<ProductType, 'id'>;
            return { id: doc.id, ...data };
        });
        setProducts(productsData);
        setLoading(false);
        };

        fetchProducts();
    }, []);

    return { products, loading };
};
