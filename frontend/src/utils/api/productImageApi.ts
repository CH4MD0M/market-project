import axios from 'axios';

import { API_URL } from '@utils/constants';
import { instance } from './instance';

// UPLOAD PRODUCT IMAGE
const uploadProductImage = (images: FileList) => {
  const files = Array.from(images);

  const formData = new FormData();
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET as string);

  const uploaders = files.map(async file => {
    formData.append('file', file);

    return await axios
      .post(API_URL.PRODUCT.UPLOAD_PRODUCT_IMAGE, formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })
      .then(response => {
        const { data } = response;

        const imageData: UploadImageData = {
          path: data.secure_url,
          publicId: data.public_id,
        };

        return imageData;
      });
  });

  return Promise.all(uploaders).then(data => data);
};

const uploadProductImageToServer = async (productId: string, imageData: UploadImageDataArray) => {
  const response = await instance.post(API_URL.PRODUCT.UPLOAD_PRODUCT_IMAGE_TO_SERVER(productId), {
    imageData,
  });
  return response;
};

// DELETE PRODUCT IMAGE
const deleteProductImage = async (imagePath: string, productId: string, imagePublicId: string) => {
  const encodedImagePath = encodeURIComponent(imagePath);
  const response = await instance.delete(
    API_URL.PRODUCT.DELETE_PRODUCT_IMAGE(encodedImagePath, productId, imagePublicId),
  );

  return response;
};

const deleteCloudinaryImage = async (publicId: string) => {
  const response = await instance.delete(API_URL.PRODUCT.DELETE_CLOUDINARY_IMAGE(publicId));
  return response;
};

export {
  uploadProductImage,
  uploadProductImageToServer,
  deleteProductImage,
  deleteCloudinaryImage,
};
