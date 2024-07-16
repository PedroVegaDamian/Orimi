
import { collection, getDocs, query, where } from '@firebase/firestore'
import { Product } from '@/models'
import { db } from '@/firebase'

export const getProduct = async (slug: string): Promise<Product | undefined> => {
  const productCollectionRef = query(
    collection(db, 'products'),
    where('slug', '==', slug)
  )
  const querySnapshot = await getDocs(productCollectionRef)

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as Product;
  } else {
    return undefined;
  }
}