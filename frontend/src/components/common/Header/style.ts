import styled from 'styled-components';

export const Navbar = styled.nav`
  background-color: hsla(0, 0%, 100%, 0.8);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  min-height: 60px;
  padding: 10px 20px;
`;

export const NavWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 0.15rem;
  cursor: pointer;
  a {
    color: #000;
  }
`;
