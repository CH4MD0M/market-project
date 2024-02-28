import { useRef, useState } from 'react';

import { useToggle } from '@hooks/useToggle';
import { useAppDispatch } from '@hooks/reduxHooks';
import { updateUserAddressThunk } from '@redux/modules/userSlice/thunk';

// Components
import Button from '@components/atoms/Button';
import PostCode from '../PostCode';

interface AddressInfoProps {
  userAddress?: string;
  userZipCode?: string;
}

const AddressInfo = ({ userAddress, userZipCode }: AddressInfoProps) => {
  const dispatch = useAppDispatch();
  const detailAddress = useRef<HTMLInputElement>(null);
  const [addressEdit, toggleAddressEdit] = useToggle(false);
  const [newAddress, setNewAddress] = useState({ fullAddress: '', newZipCode: '' });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUserAddressThunk({
        address: `${newAddress.fullAddress}, ${detailAddress.current?.value}`,
        zipCode: newAddress.newZipCode,
      }),
    );
  };

  return (
    <tr className="table-row">
      <th className="w-[100px] bg-[#eef1f8] text-left whitespace-nowrap px-[30px] py-3.5 border-b-[#ddd] border-b border-solid">
        주소
      </th>

      <td className="px-[10px] md:px-[30px] py-3.5 border-l-[#ddd] border-l border-solid border-b-[#ddd] border-b">
        <div className="flex flex-col items-start md:flex-row">
          <span className="font-semibold">
            {userAddress?.length ? `${userAddress} [${userZipCode}]` : '주소를 등록해주세요'}
          </span>
          <Button
            hovercolor="default"
            onClick={toggleAddressEdit}
            className={`px-4 py-1 mt-3 rounded-md md:mt-0 md:ml-3 font-normal ${
              addressEdit && 'bg-gray-500 w-[170px] text-white hover:bg-gray-500 hover:text-white'
            }`}
          >
            {addressEdit ? ' 주소 변경 취소' : '주소 변경'}
          </Button>
        </div>
        {addressEdit && (
          <div className="border bg-[#f0f0f0] text-[#555] text-[13px] p-2.5 mt-3 border-solid border-[#dadde4]">
            <div className="grid grid-cols-[1fr_10%] gap-2 mb-3 items-center bg-white border cursor-default">
              <span className="blockpx-3 p-1">
                {newAddress.fullAddress.length
                  ? `${newAddress.fullAddress}, ${newAddress.newZipCode}`
                  : userAddress}
              </span>
              <PostCode setNewAddress={setNewAddress} />
            </div>
            <form onSubmit={submitHandler}>
              <input className="w-full p-1" ref={detailAddress} />
              <Button
                variant="primary"
                hovercolor="default"
                type="submit"
                className="px-2 py-1 mt-4 rounded-md max-w-[120px] font-normal"
              >
                변경
              </Button>
            </form>
          </div>
        )}
      </td>
    </tr>
  );
};

export default AddressInfo;
