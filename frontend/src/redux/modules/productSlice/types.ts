export interface ProductState {
  attributesFromDb: Attribute[];
  attributesTable: Omit<Attribute, '_id'>[];
  uploadedImageData: any[];
  imageUpdated: boolean;
  imageRemoved: boolean;
}

// Attributes
export interface Attribute {
  _id: string;
  key: string;
  value: string[];
}
