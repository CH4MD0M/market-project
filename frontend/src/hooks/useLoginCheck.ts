import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { loginCheck } from '@redux/modules/authSlice/thunk';
import { setAuthCheckLoading } from '@redux/modules/authSlice';

export const useLoginCheck = () => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(state => state.auth.isLogin);

  useEffect(() => {
    if (!isLogin) {
      dispatch(setAuthCheckLoading(false));
      return;
    }

    const checkLogin = async () => {
      await dispatch(loginCheck());
    };

    checkLogin();
  }, [dispatch, isLogin]);
};
