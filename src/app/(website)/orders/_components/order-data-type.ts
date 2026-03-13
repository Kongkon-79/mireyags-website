export type OrderItem = {
  productId: string;
  name: string;
  image: string;
  size: string;
  quantity: number;
  price: number;
  offerPrice: number;
  subTotal: number;
};

export type DeliveryInfo = {
  type: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  address: string;
};

export type PaymentInfo = {
  method: string;
  paymentStatus: string;
  stripeSessionId?: string;
  paymentIntentId?: string;
};

export type Order = {
  _id: string;
  userId: string | null;
  guestEmail: string;
  items: OrderItem[];
  delivery: DeliveryInfo;
  payment: PaymentInfo;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type OrdersApiResponse = {
  status: boolean;
  message: string;
  data: {
    data: Order[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalData: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
};

export type ReviewResponse = {
  status: boolean;
  message: string;
  data: {
    _id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
  };
};