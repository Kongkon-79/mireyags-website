

import React from 'react'
import ReviewPage from './_components/review-page'

const OrderDetailsPage = ({params}:{params:{id:string}}) => {
  return (
    <div>
        <ReviewPage orderId={params?.id} />
    </div>
  )
}

export default OrderDetailsPage