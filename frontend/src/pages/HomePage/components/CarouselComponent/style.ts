import styled from 'styled-components';

interface CarouselWrapperProps {
  backgroundImage: string;
}

export const BackgroundWrapper = styled.div<CarouselWrapperProps>`
  height: 500px;
  width: 100%;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(10px);
`;
