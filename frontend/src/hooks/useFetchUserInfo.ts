import { useEffect, useState } from 'react';

import { getSingleUser } from '@utils/api';

export const useFetchUserInfo = (userId: string) => {
  const [userInfo, setUserInfo] = useState<UserAddressInfo>();
  const [userInfoMissing, setUserInfoMissing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const { address, phoneNumber, zipCode } = await getSingleUser(userId);

        if (!address || !zipCode || !phoneNumber) setUserInfoMissing(true);
        else setUserInfo({ address, zipCode, phoneNumber });
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchUserInfo();
  }, [userId]);

  return { userInfo, userInfoMissing, isLoading };
};
