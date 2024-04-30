import { useState } from 'react';
import { shallowEqual } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import {
  deleteServerPreviewImage,
  setImageFilesToDelete,
  setStagedImageFiles,
} from '@redux/modules/productSlice';

const ImageForm = () => {
  const dispatch = useAppDispatch();
  const isEditMode = useAppSelector(state => state.product.isEditMode);
  const stagedImageFiles = useAppSelector(state => state.product.stagedImageFiles, shallowEqual);
  const productImages = useAppSelector(state => state.product.productData?.images);

  const [previewImages, setPreviewImageList] = useState<string[]>([]);

  const encodeFileBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = error => {
        reject(error);
      };
    });
  };

  // Image Onchange Handler
  const imageOnchangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const encodedImages = await Promise.all(files.map(file => encodeFileBase64(file)));
      // Update image preview
      setPreviewImageList(prev => [...prev, ...(encodedImages as string[])]);
      // Update files ready to upload
      dispatch(setStagedImageFiles(files));
    }
  };

  // Delete Server Preview Image Handler
  const deleteImageHandler = async (path: string, publicId: string, id: string) => {
    // Update image preview
    dispatch(deleteServerPreviewImage(id));
    // Update files to delete
    dispatch(setImageFilesToDelete({ path, publicId }));
  };

  // Delete Local Preview Image Handler
  const deleteLocalImageHandler = (idx: number) => {
    const newPreviews = previewImages.filter((_, index) => index !== idx);
    const newImageFile = stagedImageFiles.filter((_, index) => index !== idx);
    // Update image preview
    setPreviewImageList(newPreviews);
    // Update files ready to upload except deleted image
    dispatch(setStagedImageFiles(newImageFile));
  };

  return (
    <div className="mt-[30px] p-3 border border-gray-300 rounded-md">
      <span className="block min-w-[120px] font-semibold text-[20px]">상품 이미지</span>
      <div className="flex items-center gap-4 my-[10px]">
        {isEditMode &&
          productImages?.map((image: any, idx: number) => (
            <div key={idx} className="relative">
              <img crossOrigin="anonymous" className="w-[120px]" src={image?.path} />
              <XMarkIcon
                onClick={() => deleteImageHandler(image.path, image.publicId, image._id)}
                className="w-5 h-5 cursor-pointer absolute right-0 -top-2.5"
              ></XMarkIcon>
            </div>
          ))}

        {previewImages?.map((imageData, idx) => (
          <div key={idx} className="relative">
            <img crossOrigin="anonymous" className="w-[150px] h-[150px]" src={imageData} />
            <XMarkIcon
              className="w-5 h-5 cursor-pointer absolute right-0 -top-2.5"
              onClick={() => deleteLocalImageHandler(idx)}
            />
          </div>
        ))}
      </div>
      <input name="images" type="file" multiple onChange={imageOnchangeHandler} />
    </div>
  );
};

export default ImageForm;
