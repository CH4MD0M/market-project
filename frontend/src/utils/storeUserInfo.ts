import { StorageType, setValue } from '@utils/storageUtils';

export const storeUserInfo = (doNotLogout: boolean, userInfo: any) => {
  const { isAdmin, ...rest } = userInfo;

  if (doNotLogout) {
    setValue(StorageType.LOCAL, 'userInfo', { doNotLogout, ...rest });
  } else {
    setValue(StorageType.SESSION, 'userInfo', { doNotLogout, ...rest });
  }
};
