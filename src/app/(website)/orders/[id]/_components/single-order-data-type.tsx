

export type SingleOrderApiResponse = {
  status: boolean;
  message: string;
  data: Order;
};

export type Order = {
  _id: string;
  userId: OrderUser;
  items: OrderItem[];
  delivery: DeliveryInfo;
  payment: PaymentInfo;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type OrderUser = {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
};

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
};