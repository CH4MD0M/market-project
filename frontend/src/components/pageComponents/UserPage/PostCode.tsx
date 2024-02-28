import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface PostCodeProps {
  setNewAddress: React.Dispatch<React.SetStateAction<{ fullAddress: string; newZipCode: string }>>;
}
const PostCode = ({ setNewAddress }: PostCodeProps) => {
  const open = useDaumPostcodePopup();

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setNewAddress({ fullAddress: fullAddress, newZipCode: data.zonecode });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div onClick={handleClick} className="flex justify-center items-center cursor-pointer">
      <MagnifyingGlassIcon className="w-5 h-5 text-[#4565cc]" />
    </div>
  );
};

export default PostCode;
