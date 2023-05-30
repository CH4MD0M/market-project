interface Product {
  _id: string;
  name: string;
  description: string;
  reviewsNumber: number;
  category?: string;
  rating: number;
  count: number;
  price: number;
  reviews: ReviewData[];
  attrs: AttrsData[];
  images: UploadImageDataArray;
}

// Attributes
interface AttrsData {
  _id?: string;
  key: string;
  val: string;
  selectedCategory?: string;
}

// Image
interface UploadImageData {
  path: string;
  publicId: string;
}
type UploadImageDataArray = UploadImageData[];

// Review
interface ReviewData {
  _id?: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
}
