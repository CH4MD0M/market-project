import axios from 'axios';

import { API_URL } from '@utils/constants';
import { instance } from './instance';

// UPLOAD PRODUCT IMAGE
const uploadProductImageToCloudinary = (images: File[]) => {
  const uploaders = images.map(async file => {
    const formData = new FormData();
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET as string);
    formData.append('file', file);

    try {
      const response = await axios.post(API_URL.PRODUCT.UPLOAD_PRODUCT_IMAGE, formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });
      const { data } = response;

      return {
        path: data.secure_url,
        publicId: data.public_id,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  return Promise.all(uploaders);
};

// DELETE PRODUCT IMAGE
const deleteProductImage = async (imagePath: string, productId: string, publicId: string) => {
  try {
    const encodedImagePath = encodeURIComponent(imagePath);
    // delete image from database
    await instance.delete(
      API_URL.PRODUCT.DELETE_PRODUCT_IMAGE(encodedImagePath, productId, publicId),
    );

    // delete image from cloudinary
    await instance.delete(API_URL.PRODUCT.DELETE_CLOUDINARY_IMAGE(publicId));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { uploadProductImageToCloudinary, deleteProductImage };
