import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// CSS
import * as S from './style';

const Footer = () => {
  return <S.Footer>&copy; {new Date().getFullYear()}, 모시깽 마켓</S.Footer>;
};

export default Footer;
