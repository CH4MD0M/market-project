import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { userPhoneSchema, UserPhoneSchemaType } from '@schemas/userInfoSchema';
import { useToggle } from '@hooks/useToggle';
import { useAppDispatch } from '@hooks/reduxHooks';
import { updateUserPhoneThunk } from '@redux/modules/userSlice/thunk';

import Button from '@components/atoms/Button';

interface PhoneInfoProps {
  userPhoneNum?: string;
}

const PhoneInfo = ({ userPhoneNum }: PhoneInfoProps) => {
  const dispatch = useAppDispatch();
  const [phoneNumberEdit, togglePhoneNumberEdit] = useToggle(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<UserPhoneSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(userPhoneSchema),
  });

  // submitHandler
  const submitHandler: SubmitHandler<UserPhoneSchemaType> = async data => {
    await dispatch(updateUserPhoneThunk(data));
    reset();
  };

  return (
    <tr className="table-row">
      <th className="w-[100px] bg-[#eef1f8] text-left whitespace-nowrap px-[30px] py-3.5 border-b-[#ddd] border-b border-solid">
        휴대폰 번호
      </th>
      <td className="px-[10px] md:px-[30px] py-3.5 border-l-[#ddd] border-l border-solid border-b-[#ddd] border-b">
        <div className="flex items-center">
          <span className="font-semibold">{userPhoneNum || '휴대폰 번호를 등록해주세요.'}</span>
          <Button
            hovercolor="default"
            onClick={togglePhoneNumberEdit}
            className={`px-4 py-1 rounded-md ml-3 md:ml-8 font-normal ${
              phoneNumberEdit && 'bg-gray-500 text-white hover:bg-gray-500 hover:text-white'
            }`}
          >
            {phoneNumberEdit ? ' 휴대폰 번호 변경 취소' : '휴대폰 번호 변경'}
          </Button>
        </div>

        {phoneNumberEdit && (
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="border bg-[#f0f0f0] text-[#555] text-[11px] p-2.5 mt-3 border-solid border-[#dadde4]"
          >
            <div className="flex h-[30px]">
              <input {...register('phoneNumber')} className="w-[175px] px-[5px] py-0.5" />
              <Button
                disabled={!isDirty || !isValid}
                variant="primary"
                hovercolor="default"
                type="submit"
                className="px-2 py-1 rounded-md ml-2 font-normal"
              >
                변경하기
              </Button>
            </div>
            {errors.phoneNumber && (
              <div className="w-full mt-1 animate-fadeIn flex items-center gap-1.5 text-red-500">
                <ExclamationCircleIcon className="w-4 h-4" />
                <span className="text-[14px]">{errors.phoneNumber?.message}</span>
              </div>
            )}
          </form>
        )}
      </td>
    </tr>
  );
};

export default PhoneInfo;
