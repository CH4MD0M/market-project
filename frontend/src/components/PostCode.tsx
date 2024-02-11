import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

import { useAppDispatch } from '@hooks/reduxHooks';
import { setAddress } from '@redux/modules/userSlice';

import Button from '@components/atoms/Button';

const PostCode = () => {
  const dispatch = useAppDispatch();
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
    dispatch(setAddress({ newAddress: fullAddress, newZipCode: data.zonecode }));
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <Button variant="default" size="lg" onClick={handleClick}>
      주소찾기
    </Button>
  );
};

export default PostCode;
