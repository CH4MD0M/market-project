import { BeatLoader } from 'react-spinners';

const LoadingPage = () => {
  return (
    <div className="w-full h-[calc(100vh_-_200px)] flex justify-center items-center">
      <BeatLoader color="#4565cc" size={25} />
    </div>
  );
};

export default LoadingPage;
