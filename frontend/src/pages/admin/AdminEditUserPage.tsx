import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { editUser, getSingleUser } from '@utils/api';
import { editUserInfoSchema, EditUserInfoSchemaType } from '@schemas/editUserInfoSchema';

// Components
import Heading from '@components/atoms/Heading';
import Button from '@components/atoms/Button';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userInfoData, setUserInfoData] = useState<EditUserFormData>();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<EditUserInfoSchemaType>({
    resolver: zodResolver(editUserInfoSchema),
  });

  const submitHandler: SubmitHandler<EditUserInfoSchemaType> = async data => {
    const response = await editUser(id!, data);
    if (response.status === 200) navigate('/admin/users');
  };

  useEffect(() => {
    getSingleUser(id!).then(data => {
      const { email, name, isAdmin } = data;
      setUserInfoData({ email, name, isAdmin });
    });
  }, [id]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading size="lg" className="my-[40px]">
          사용자 정보 수정
        </Heading>
        <Link to="/admin/products" className="my-3">
          <Button variant="primary" className="mb-2">
            뒤로가기
          </Button>
        </Link>
      </div>

      <form className="w-full bg-slate-50 p-3" onSubmit={handleSubmit(submitHandler)}>
        <div className="flex items-center mb-5">
          <span className="block min-w-[120px] font-semibold text-[18px]">사용자 이름</span>
          <input
            className="px-2 border border-gray-300 rounded-md h-8 w-[300px]"
            {...register('name')}
            defaultValue={userInfoData?.name}
          />
        </div>
        <div className="flex items-center mb-5">
          <span className="block min-w-[120px] font-semibold text-[18px]">사용자 이메일</span>
          <input
            className="px-2 border border-gray-300 rounded-md h-8 w-[300px]"
            {...register('email')}
            defaultValue={userInfoData?.email}
          />
        </div>
        <div className="flex items-center mb-5">
          <span className="block min-w-[120px] font-semibold text-[18px]">관리자 권한</span>
          <input
            type="checkbox"
            className="px-2 border border-gray-300 rounded-md h-4 w-4"
            {...register('isAdmin')}
          />
        </div>
        <Button variant="primary" hovercolor="default" type="submit" disabled={!isValid}>
          수정
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
