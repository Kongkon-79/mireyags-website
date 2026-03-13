export interface CartProduct {
  id: number | string;
  name: string ;
  description: string;
  price: number;
  image: string;
  inStock: string | number;
  quantity: number;
  detailsHref?: string;
}

export interface DeliveryInfo {
  deliveryType: "home" | "office";
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  address: string;
}