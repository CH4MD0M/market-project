import React from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { Button } from 'react-bootstrap';

import { useAppDispatch } from '@hooks/reduxHooks';
import { setAddress } from '@redux/modules/userSlice';

const Postcode = () => {
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

    dispatch(setAddress({ address: fullAddress, zipCode: data.zonecode }));
  };
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <Button className="text-nowrap ms-2" variant="primary" onClick={handleClick}>
      주소입력
    </Button>
  );
};

export default Postcode;
