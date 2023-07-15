import { useState } from 'react';
import { Button, Form, Toast } from 'react-bootstrap';

import * as S from '../UserChat/style';

const AdminChat = () => {
  const [toast1, closeToast1] = useState(true);

  const close1 = () => closeToast1(false);

  return (
    <>
      <Toast show={toast1} className="ms-4 mb-5" onClose={close1}>
        <Toast.Header>
          <strong className="me-auto">사용자: 홍길동</strong>
        </Toast.Header>
        <Toast.Body>
          <S.ChatMessage>
            {Array.from({ length: 20 }).map((_, idx) => (
              <div key={idx}>
                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                  <b>관리자:</b> Hello, World!
                </p>

                <p>
                  <b>홍길동:</b> Hello, World!!
                </p>
              </div>
            ))}
          </S.ChatMessage>

          <Form>
            <Form.Group className="mb-3">
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
            <Button variant="success" type="submit">
              전송
            </Button>
          </Form>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default AdminChat;
