import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { useAppDispatch } from '@hooks/reduxHooks';
import { updateUserPasswordThunk } from '@redux/modules/userSlice/thunk';
import { userPasswordSchema, UserPasswordSchemaType } from '@schemas/userInfoSchema';

import Button from '@components/atoms/Button';

const PasswordInfo = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<UserPasswordSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(userPasswordSchema),
  });

  const submitHandler: SubmitHandler<UserPasswordSchemaType> = async data => {
    dispatch(updateUserPasswordThunk({ password: data.password }));
  };

  return (
    <tr className="table-row">
      <th className="w-[100px] bg-[#eef1f8] text-left whitespace-nowrap px-[30px] py-3.5 border-b-[#ddd] border-b border-solid">
        비밀번호
      </th>

      <td className="px-[10px] md:px-[30px] py-3.5 border-l-[#ddd] border-l border-solid border-b-[#ddd] border-b">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col text-[#555] text-[11px] p-2.5 mt-3 border-solid border-[#dadde4]"
        >
          <div className="flex">
            <label htmlFor="password" className="mb-2 w-[120px] text-[14px]">
              새 비밀번호
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-[200px] px-[5px] py-0.5 mb-2 border"
            />
          </div>
          {errors.password && (
            <div className="animate-fadeIn flex items-center gap-1.5 text-red-500">
              <ExclamationCircleIcon className="w-4 h-4" />
              <p>{errors.password?.message}</p>
            </div>
          )}
          <div className="flex mt-3">
            <label htmlFor="passwordCheck" className="mb-2 w-[120px] text-[14px]">
              비밀번호 다시 입력
            </label>
            <input
              id="passwordCheck"
              type="password"
              {...register('passwordCheck')}
              className="w-[200px] px-[5px] py-0.5 mb-4 border"
            />
          </div>
          {errors.passwordCheck && (
            <div className="animate-fadeIn flex items-center gap-1.5 text-red-500">
              <ExclamationCircleIcon className="w-4 h-4" />
              <p>{errors.passwordCheck?.message}</p>
            </div>
          )}
          <Button
            disabled={!isDirty || !isValid}
            variant="primary"
            hovercolor="default"
            type="submit"
            className="px-2 py-1 mt-1 ml-[120px] rounded-md max-w-[120px] font-normal"
          >
            비밀번호 변경
          </Button>
        </form>
      </td>
    </tr>
  );
};

export default PasswordInfo;
