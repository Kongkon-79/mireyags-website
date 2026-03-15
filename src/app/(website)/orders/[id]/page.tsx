

import React from 'react'
import OrderDetails from './_components/order-details-container'

const OrderDetailsPage = ({params}:{params:{id:string}}) => {
  return (
    <div>
        <OrderDetails orderId={params?.id} />
      
    </div>
  )
}

export default OrderDetailsPage