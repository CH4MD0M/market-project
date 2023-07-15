import { SyncLoader } from 'react-spinners';
import styled from 'styled-components';

const LoadingSpinnerWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingPage = () => {
  return (
    <LoadingSpinnerWrapper>
      <SyncLoader color="#86CEEB" />
    </LoadingSpinnerWrapper>
  );
};

export default LoadingPage;
