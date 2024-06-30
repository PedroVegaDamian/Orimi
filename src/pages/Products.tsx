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
    <div className="bg-bg_color mb-[120px]">
      <div className="m-8">
        <h1 className="mt-5 mb-5 font-nunito text-22 font-bold text-center text-primary_800_color text-2xl">
          Products
        </h1>
        <div className="mb-4 flex flex-wrap justify-center md:flex-nowrap md:justify-center gap-2.5">
          <div className="w-full md:hidden">
            <select
              className="w-full p-2 rounded bg-primary_color"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category} >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden md:flex md:justify-center md:gap-2.5">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category)}
                extraClass={`mx-2 ${selectedCategory === category ? 'bg-primary_tono5_color text-white_color' : ''}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
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
