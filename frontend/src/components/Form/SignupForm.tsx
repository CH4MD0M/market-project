import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoonLoader } from 'react-spinners';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { signupSchema, SignupSchemaType } from '@schemas/signupSchema';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { signup } from '@redux/modules/authSlice/thunk';

import Button from '@components/atoms/Button';
import Input from '@components/atoms/Input';

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<SignupSchemaType>({
    mode: 'all',
    resolver: zodResolver(signupSchema),
  });

  const submitHandler: SubmitHandler<SignupSchemaType> = async data => {
    const response = await dispatch(signup(data));
    if (response.meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  };

  return (
    <form className=" flex w-[460px] flex-col gap-y-7" onSubmit={handleSubmit(submitHandler)}>
      <div className="grid gap-4">
        <Input placeholder="이름" {...register('name')} />
        {errors.name && (
          <div className="animate-fadeIn flex items-center gap-2 text-red-500">
            <ExclamationCircleIcon className="w-6 h-6 " />
            <p>{errors.name?.message}</p>
          </div>
        )}
      </div>
      <div className="grid gap-4">
        <Input placeholder="이메일" {...register('email')} />
        {errors.email && (
          <div className="animate-fadeIn flex items-center gap-1.5 text-red-500">
            <ExclamationCircleIcon className="w-6 h-6 " />
            <p>{errors.email?.message}</p>
          </div>
        )}
      </div>
      <div className="grid gap-4">
        <Input placeholder="비밀번호" type="password" {...register('password')} />
        {errors.password && (
          <div className="animate-fadeIn flex items-center gap-1.5 text-red-500">
            <ExclamationCircleIcon className="w-6 h-6" />
            <p>{errors.password?.message}</p>
          </div>
        )}
      </div>
      <div className="grid gap-4">
        <Input placeholder="비밀번호 확인" type="password" {...register('passwordCheck')} />
        {errors.passwordCheck && (
          <div className="animate-fadeIn flex items-center gap-1.5 text-red-500">
            <ExclamationCircleIcon className="w-6 h-6" />
            <p>{errors.passwordCheck?.message}</p>
          </div>
        )}
      </div>
      <Button
        disabled={!isDirty || !isValid}
        variant={'primary'}
        className=" flex gap-4"
        type="submit"
        size="lg"
      >
        {loading ? <MoonLoader color="#9ab0f4" size={20} /> : <span>회원가입</span>}
      </Button>
    </form>
  );
};

export default SignupForm;
