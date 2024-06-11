import { useState, useEffect } from 'react'
import { getProducts } from '@/services/getProducts'
import { Product as ProductType, OptionsProducts } from '@/models'

export const useFetchProducts = (options?: OptionsProducts) => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const productsData = await getProducts(options)
      setProducts(productsData)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  return { products, loading }
}
