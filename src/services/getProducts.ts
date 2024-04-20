import { collection, getDocs, query, orderBy, limit} from '@firebase/firestore'
import { Products } from '@/models'
import { db } from '@/firebase'

export const getProducts = async (): Promise<Products[]> => {
  const productsCollectionRef = query(collection(db, 'products'), orderBy('price'), limit(8))
  const querySnapshot = await getDocs(productsCollectionRef)
  const productsList: Products[] = []
  querySnapshot.forEach(doc => {
    const product = doc.data() as Products
    productsList.push(product)
  })
  return productsList
}
