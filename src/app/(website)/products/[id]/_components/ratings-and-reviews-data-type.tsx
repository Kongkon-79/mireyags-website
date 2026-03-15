

export interface ReviewsApiResponse {
  status: boolean;
  message: string;
  data: ReviewData;
}

export interface ReviewData {
  data: Review[];
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface Review {
  _id: string;
  userId: ReviewUser;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewUser {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  
}