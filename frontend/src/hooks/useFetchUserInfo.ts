import { useEffect, useState } from 'react';

import { useAppDispatch } from '@hooks/reduxHooks';
import { setUserProfileInfo } from '@redux/modules/userSlice';
import { getSingleUser } from '@utils/api';

export const useFetchUserInfo = (userId: string) => {
  const dispatch = useAppDispatch();
  const [userInfoMissing, setUserInfoMissing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const { address, phoneNumber, zipCode } = await getSingleUser(userId);

        if (!address || !zipCode || !phoneNumber) setUserInfoMissing(true);
        else dispatch(setUserProfileInfo({ address, zipCode, phoneNumber }));
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchUserInfo();
  }, [userId]);

  return { userInfoMissing, isLoading };
};
