import { Link } from 'react-router-dom';

// Components
import CenterWrapper from '@components/atoms/CenterWrapper';
import Heading from '@components/atoms/Heading';
import LoginForm from '@components/Form/LoginForm';

const LoginPage = () => {
  return (
    <CenterWrapper size={'sm'} className="mt-[7rem]">
      <main className="mx-auto mt-20 mb-10 flex flex-col items-center justify-center">
        <Heading size="lg" className="mb-[20px]">
          로그인
        </Heading>
        <LoginForm />
        <p className="mt-5">
          계정이 없으신가요? &nbsp;
          <Link to="/register" className="text-blue-500">
            회원가입 하기
          </Link>
        </p>
      </main>
    </CenterWrapper>
  );
};

export default LoginPage;
