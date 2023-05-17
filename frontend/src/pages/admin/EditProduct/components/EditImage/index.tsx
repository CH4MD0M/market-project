import { useAppDispatch } from '@/hooks/reduxHooks';
import { setImageRemoved } from '@/redux/modules/productSlice';
import { deleteProductImage, uploadProductImage } from '@/utils/api';

import React, { useState } from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';

const onHover: React.CSSProperties = {
  cursor: 'pointer',
  position: 'absolute',
  left: '5px',
  top: '-10px',
  transform: 'scale(2.7)',
};

interface EditImageProps {
  product: any;
  id: string;
}

const EditImage = ({ product, id }: EditImageProps) => {
  const dispatch = useAppDispatch();

  const [isUploading, setIsUploading] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);

  const deleteImageHandler = (imagePath: string) => {
    deleteProductImage(imagePath, id)
      .then(() => dispatch(setImageRemoved(true)))
      .then(() => {
        setTimeout(() => {
          dispatch(setImageRemoved(false));
        }, 2500);
      });
  };

  const uploadImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setIsUploading('Uploading...');
      const formData = new FormData();
      formData.append('image', files[0]);
      const { data } = await uploadProductImage(id, formData);
      if (data) {
        setImageUploaded(true);
        setIsUploading('');
      }
    }
  };

  return (
    <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
      <Form.Label>상품 이미지</Form.Label>
      <Row>
        {product.images &&
          product.images.map((image: any, idx: string) => (
            <Col key={idx} style={{ position: 'relative' }} xs={3}>
              <Image crossOrigin="anonymous" src={image.path ?? null} fluid />
              <i
                style={onHover}
                onClick={() => deleteImageHandler(image.path)}
                className="bi bi-x text-danger"
              ></i>
            </Col>
          ))}
      </Row>
      <Form.Control required type="file" multiple onChange={uploadImageHandler} />
      {isUploading}
    </Form.Group>
  );
};

export default EditImage;
