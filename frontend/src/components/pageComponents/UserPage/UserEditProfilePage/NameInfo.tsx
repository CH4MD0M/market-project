import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shallowEqual } from 'react-redux';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { userNameSchema, UserNameSchemaType } from '@schemas/userInfoSchema';
import { useToggle } from '@hooks/useToggle';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { updateUserNameThunk } from '@redux/modules/userSlice/thunk';
import { storeUserInfo } from '@utils/storeUserInfo';

import Button from '@components/atoms/Button';

interface NameInfoInput {
  name: string;
}

interface NameInfoProps {
  userName: string;
}

const NameInfo = ({ userName }: NameInfoProps) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.user.userData, shallowEqual);
  const doNotLogout = useAppSelector(state => state.user.userData.doNotLogout);
  const [nameEdit, toggleNameEdit] = useToggle(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<NameInfoInput>({
    mode: 'onBlur',
    resolver: zodResolver(userNameSchema),
  });

  // submitHandler
  const submitHandler: SubmitHandler<UserNameSchemaType> = async data => {
    const { userUpdated } = await dispatch(updateUserNameThunk({ ...data, doNotLogout })).unwrap();
    storeUserInfo(userData.doNotLogout, userUpdated);
    reset();
  };

  return (
    <tr className="table-row">
      <th className="w-[100px] bg-[#eef1f8] text-left whitespace-nowrap px-[30px] py-3.5 border-b-[#ddd] border-b border-solid">
        이름
      </th>
      <td className="px-[10px] md:px-[30px] py-3.5 border-l-[#ddd] border-l border-solid border-b-[#ddd] border-b">
        <div className="flex items-center">
          <span className="font-semibold">{userName}</span>
          <Button
            hovercolor="default"
            onClick={toggleNameEdit}
            className={`px-4 py-1 rounded-md ml-3 md:ml-8 font-normal ${
              nameEdit && 'bg-gray-500 text-white hover:bg-gray-500 hover:text-white'
            }`}
          >
            {nameEdit ? '이름 변경 취소' : '이름 변경'}
          </Button>
        </div>

        {nameEdit && (
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="border bg-[#f0f0f0] text-[#555] text-[11px] p-2.5 mt-3 border-solid border-[#dadde4]"
          >
            <div className="flex h-[30px]">
              <input {...register('name')} className="w-[175px] px-[5px] py-0.5" />
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
            {errors.name && (
              <div className="w-full mt-1 animate-fadeIn flex items-center gap-1.5 text-red-500">
                <ExclamationCircleIcon className="w-4 h-4" />
                <span className="text-[14px]">{errors.name?.message}</span>
              </div>
            )}
          </form>
        )}
      </td>
    </tr>
  );
};

export default NameInfo;
