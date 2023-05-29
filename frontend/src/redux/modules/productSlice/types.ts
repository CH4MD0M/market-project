export interface ProductState {
  attributesFromDb: Attribute[];
  attributesTable: Omit<Attribute, '_id'>[];
  uploadedImageData: any[];
  imageUpdated: boolean;
  imageRemoved: boolean;
  pageNum: number;
  maxPageNum: number;
}

// Attributes
export interface Attribute {
  _id: string;
  key: string;
  value: string[];
}
