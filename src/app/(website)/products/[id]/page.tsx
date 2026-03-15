import React from 'react'
import ProductDetailsContainer from './_components/products-details-container'
import RatingsReviewsSection from './_components/ratings-and-reviews'
import RelatedProductsSection from './_components/related-products'

const ProductDetailsPage = ({params}:{params:{id:string}}) => {
  return (
    <div>
        <ProductDetailsContainer id={params?.id}/>
        <RelatedProductsSection/>
        <RatingsReviewsSection id={params?.id}/>
    </div>
  )
}

export default ProductDetailsPage