import { collection, getDocs, query, limit } from '@firebase/firestore'

import { db } from '@/firebase'
import { OptionsProducts, Product } from '@/models'

export const getProducts = async (
	options?: OptionsProducts
): Promise<Product[]> => {
	const limitNumber = options?.limit || Infinity

	const productsCollectionRef = query(
		collection(db, 'products'),
		limit(limitNumber)
	)
	const querySnapshot = await getDocs(productsCollectionRef)
	return querySnapshot.docs.map(
		doc =>
			({
				id: doc.id,
				...doc.data()
			}) as Product
	)
}
