interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  count: number;
  reviews: any[];
  attrs: AttrsData[];
}

interface AttrsData {
  _id?: string;
  key: string;
  val: string;
  selectedCategory?: string;
}

interface UploadImageData {
  path: string;
  publicId: string;
}

type UploadImageDataArray = UploadImageData[];
