import React, { useState } from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';

import { useAppDispatch } from '@hooks/reduxHooks';
import { setImageRemoved, setImageUpdated } from '@redux/modules/productSlice';
import { deleteProductImage, uploadProductImage, uploadProductImageToServer } from '@utils/api';

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

  const [errorMessages, setErrorMessages] = useState<string>('');

  // Upload Image Handler
  const uploadImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    try {
      const data = await uploadProductImage(images);
      const response = await uploadProductImageToServer(id, data);
      if (response.status === 200) {
        dispatch(setImageUpdated(true));
      }
    } catch (error: any) {
      setErrorMessages(error.message);
    }
  };

  // Delete Image Handler
  const deleteImageHandler = async (path: string, publicId: string) => {
    try {
      const response = await deleteProductImage(path, id, publicId);
      if (response.status === 200) dispatch(setImageRemoved(true));
    } catch (error: any) {
      setErrorMessages(error.message);
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
                onClick={() => deleteImageHandler(image.path, image.publicId)}
                className="bi bi-x text-danger"
              ></i>
            </Col>
          ))}
      </Row>
      <Form.Control type="file" multiple onChange={uploadImageHandler} />
      {errorMessages && <p className="text-danger">{errorMessages}</p>}
    </Form.Group>
  );
};

export default EditImage;
