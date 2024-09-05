import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'

import PlaceHolder from '@/assets/icons/placeholder-loading.svg'
import { Product } from '@/models'

import 'react-lazy-load-image-component/src/effects/blur.css'

interface ProductsListProps {
	products: Product[]
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
	return (
		<>
			{products.map(product => (
				<Link
					key={product.id}
					to={`/product/${product.slug}`}
					className="flex flex-col bg-white p-4 rounded-lg items-center"
				>
					<div
						key={product.id}
						className="flex flex-col bg-white p-4 rounded-lg"
					>
						<LazyLoadImage
							className="w-48 h-48 object-cover rounded-lg"
							effect="blur"
							alt={product.name}
							src={product.image1}
							placeholderSrc={PlaceHolder}
						/>
						<h3 className="mt-4 font-nunito text-xl font-bold text-primary_800_color text-center">
							{product.name}
						</h3>
						<p className="mt-2 text-lg font-semibold text-center">
							${product.price}
						</p>
					</div>
				</Link>
			))}
		</>
	)
}

export default ProductsList
