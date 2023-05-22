import React from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setImageDataAfterDeleted, setImageDataAfterUploaded } from '@redux/modules/productSlice';
import { deleteCloudinaryImage, uploadProductImage } from '@utils/api';

const onHover: React.CSSProperties = {
  cursor: 'pointer',
  position: 'absolute',
  left: '5px',
  top: '-10px',
  transform: 'scale(2.7)',
};

const CreateImage = () => {
  const dispatch = useAppDispatch();
  const { uploadedImageData } = useAppSelector(state => state.product);

  // Upload Image Handler
  const imageUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    const data = await uploadProductImage(images);

    dispatch(setImageDataAfterUploaded(data));
  };

  // Delete Image Handler
  const imageDeleteHandler = async (publicId: string) => {
    const modifiedImage = uploadedImageData.filter(image => image.publicId !== publicId);
    dispatch(setImageDataAfterDeleted(modifiedImage));

    await deleteCloudinaryImage(publicId);
  };

  return (
    <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
      <Form.Label>상품 이미지</Form.Label>
      <Row>
        {uploadedImageData &&
          uploadedImageData?.map((imageData, idx) => (
            <Col key={idx} style={{ position: 'relative' }} xs={3}>
              <Image crossOrigin="anonymous" src={imageData.path ?? null} fluid />
              <i
                style={onHover}
                onClick={() => imageDeleteHandler(imageData.publicId)}
                className="bi bi-x text-danger"
              ></i>
            </Col>
          ))}
      </Row>
      <Form.Control required name="images" type="file" multiple onChange={imageUploadHandler} />
    </Form.Group>
  );
};

export default CreateImage;
