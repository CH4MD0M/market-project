import { Link } from 'react-router-dom';

// Components
import CenterWrapper from '@components/atoms/CenterWrapper';
import Heading from '@components/atoms/Heading';
import SignupForm from '@components/Form/SignupForm';

const RegisterPage = () => {
  return (
    <CenterWrapper size={'sm'} className="mt-[7rem]">
      <main className="mx-auto mt-15 mb-10 flex flex-col items-center justify-center">
        <Heading size="lg" className="mb-[20px]">
          회원가입
        </Heading>
        <SignupForm />
        <p className="mt-5">
          이미 가입하셨나요? &nbsp;
          <Link to="/login" className="text-blue-500">
            로그인 하기
          </Link>
        </p>
      </main>
    </CenterWrapper>
  );
};

export default RegisterPage;
