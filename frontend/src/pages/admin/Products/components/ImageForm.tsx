import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import {
  deleteServerPreviewImage,
  setImageFilesToDelete,
  setStagedImageFiles,
} from '@redux/modules/productSlice';
import { shallowEqual } from 'react-redux';

const onHover: React.CSSProperties = {
  cursor: 'pointer',
  position: 'absolute',
  left: '5px',
  top: '-10px',
  transform: 'scale(2.7)',
};

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
    <>
      <form className="mb-3 mt-3">
        <label>상품 이미지</label>
        <div>
          {isEditMode &&
            productImages?.map((image: any, idx: number) => (
              <div key={idx} style={{ position: 'relative' }}>
                <img crossOrigin="anonymous" src={image?.path} />
                <i
                  style={onHover}
                  onClick={() => deleteImageHandler(image.path, image.publicId, image._id)}
                  className="bi bi-x text-danger"
                ></i>
              </div>
            ))}

          {previewImages?.map((imageData, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              <img crossOrigin="anonymous" src={imageData} />
              <i
                style={onHover}
                onClick={() => deleteLocalImageHandler(idx)}
                className="bi bi-x text-danger"
              ></i>
            </div>
          ))}
        </div>
        {/* <Form.Control name="images" type="file" multiple onChange={imageOnchangeHandler} /> */}
      </form>
      {/* {errorMessages && <p className="text-danger">{errorMessages}</p>} */}
    </>
  );
};

export default ImageForm;
