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
interface ImageData {
  _id?: string;
  publicId: string;
  path: string;
}
type UploadImageDataArray = ImageData[];
type ProductImageList = ImageData[];

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

// Product Form Input
type formInputType = 'name' | 'count' | 'price' | 'description';
type ProductFormInputType = {
  [key in formInputType]: string;
};

// ///////////////////////////////////
interface CategoryAttr {
  _id?: string;
  key: string;
  value: string[];
}
