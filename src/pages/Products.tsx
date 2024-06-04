import { useState, useEffect } from 'react';
import { Loading } from '@/components/Loading';
import { Suspense, lazy } from 'react';
import { db } from '@/firebase/index';
import { Button } from '@/components/ui/Button';
import { collection, getDocs } from 'firebase/firestore';
import { Product as ProductType } from '@/models';

const ProductsList = lazy(() => import('@/components/ProductsList'));

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  if (loading) {
    return <Loading />;
  }

  const categories = ['All', 'birds', 'mammals', 'amphibians', 'fish', 'insects', 'reptiles'];

  return (
    <div className="bg-bg_color">
      <div className="m-8">
        <h1 className="mt-5 mb-5 font-nunito text-22 font-bold text-center text-primary_800_color text-2xl">
          Products
        </h1>
        <div className="mb-4 flex justify-center">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`mx-2 ${selectedCategory === category ? 'bg-primary_tono5_color text-white_color' : ''}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
        <Suspense fallback={<Loading />}>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] w-full">
            <ProductsList products={filteredProducts} />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default ProductsPage;
