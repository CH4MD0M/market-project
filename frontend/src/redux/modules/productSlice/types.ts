export interface ProductState {
  productData: Product;
  categoryAttributes: CategoryAttributes[];
  selectedAttributes: Omit<CategoryAttributes, '_id'>[];
  stagedImageFiles: File[];
  imageFilesToDelete: UploadImageDataArray;
  isEditMode: boolean;
  productFormInputs: ProductFormInputType;
}

// Attributes
export interface CategoryAttributes {
  _id: string;
  key: string;
  value: string[];
}
