export interface ProductState {
  productData: Product | null;
  categoryAttributes: CategoryAttributes[];
  selectedAttributes: Omit<CategoryAttributes, '_id'>[];
  stagedImageFiles: File[];
  imageFilesToDelete: UploadImageDataArray;
  isEditMode: boolean;
  productFormInputs: ProductFormInputType;
  errorMessage?: string;
}

// Attributes
export interface CategoryAttributes {
  _id: string;
  key: string;
  value: string[];
}
