import { useEffect, useState } from 'react';
// import { useStore } from '@/store'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { Product } from '@/models';
import { useCartStore } from '@/store/cartStore';

export const HomePage = () => {
  // const bears = useStore(state => state.bears)
  const [products, setProducts] = useState<Product[]>([]);
  
  const addProduct = useCartStore(state => state.addProduct);
  const productsArray = useCartStore(state => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsREf = collection(db, "products");
        const response = await getDocs(productsREf);

        const docs:Product[] = response.docs.map(doc => {
          return {...doc.data(), id: doc.id}
        }) as Product[];
        console.log(docs);
        
        setProducts(docs)
      } catch (error) {
        const err = error as Error;
        console.log(err.message);
      }
    }
    
    fetchProducts()
  }, []);
  
  
  useEffect(() => {
    console.log(productsArray);
  }, [productsArray]);



  return (
    <div className='h-screen flex justify-center items-center'>
      {/* <h1>{bears} around here...</h1> */}
      <div className='flex flex-wrap justify-center gap-4'>
        {
          products.map(product => {
            return (
              <div key={product.id} className='flex flex-col justify-center items-center'>
                <img src={product.image} className='w-[150px]' alt={product.name} />
                <h2>{product.name}</h2>
                <button onClick={() => addProduct(product)} className='bg-indigo-700 hover:bg-green-700'>add cart</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
