import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoonLoader } from 'react-spinners';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { login } from '@redux/modules/authSlice/thunk';
import { loginSchema, LoginSchemaType } from '@schemas/loginSchema';

import Input from '@components/atoms/Input';
import Button from '@components/atoms/Button';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const submitHandler: SubmitHandler<LoginSchemaType> = async data => {
    await dispatch(login(data));
  };

  return (
    <form className=" flex w-[460px] flex-col gap-y-7" onSubmit={handleSubmit(submitHandler)}>
      <div className="grid gap-4">
        <Input placeholder="이메일" {...register('email')} />
        {errors.email && (
          <div className="animate-fadeIn flex items-center gap-2 text-red-500">
            <ExclamationCircleIcon className="w-6 h-6 " />
            <p>{errors.email?.message}</p>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        <Input placeholder="비밀번호" type="password" {...register('password')} />
        {errors.password && (
          <div className="animate-fadeIn flex items-center gap-2 text-red-500">
            <ExclamationCircleIcon className="w-6 h-6" />
            <p>{errors.password?.message}</p>
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
        {loading ? <MoonLoader color="#9ab0f4" size={20} /> : <span>로그인</span>}
      </Button>
    </form>
  );
};

export default LoginForm;
