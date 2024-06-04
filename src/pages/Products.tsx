import { useState } from 'react';
import { Loading } from '@/components/Loading';
import { Suspense, lazy } from 'react';
import { Button } from '@/components/ui/Button';
import { Categories } from '@/models/index';
import { useFetchProducts } from '@/hooks/useFetchProducts';

const ProductsList = lazy(() => import('@/components/ProductsList'));

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(Categories.All);
  const { products, loading } = useFetchProducts();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === Categories.All
    ? products
    : products.filter(product => product.category === selectedCategory);

  if (loading) {
    return <Loading />;
  }

  const categories = Object.values(Categories);

  return (
    <div className="bg-bg_color">
      <div className="m-8">
        <h1 className="mt-5 mb-5 font-nunito text-22 font-bold text-center text-primary_800_color text-2xl">
          Products
        </h1>
        <div className="mb-4 flex flex-wrap justify-center md:flex-nowrap md:justify-center gap-2.5">
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
