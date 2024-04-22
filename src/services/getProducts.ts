import { collection, getDocs, query, limit } from '@firebase/firestore'
import { Product } from '@/models'
import { db } from '@/firebase'

export const getProducts = async (): Promise<Product[]> => {
  const productsCollectionRef = query(collection(db, 'products'), limit(8))
  const querySnapshot = await getDocs(productsCollectionRef)
  return querySnapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data()
      } as Product)
  )
}
