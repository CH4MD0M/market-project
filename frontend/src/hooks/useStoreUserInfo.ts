import { StorageType, setValue } from '@utils/storageUtils';

export const useStoreUserInfo = () => {
  const storeUserInfo = (doNotLogout: boolean, userInfo: any) => {
    const { isAdmin, ...rest } = userInfo;

    if (doNotLogout) {
      setValue(StorageType.LOCAL, 'userInfo', { doNotLogout: true, ...rest });
    } else {
      setValue(StorageType.SESSION, 'userInfo', { doNotLogout: false, ...rest });
    }
  };

  return storeUserInfo;
};
