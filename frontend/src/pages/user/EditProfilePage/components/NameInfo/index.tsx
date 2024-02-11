import { shallowEqual } from 'react-redux';

import { updateUserNameThunk } from '@redux/modules/userSlice/thunk';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';

// import { useInput } from '@hooks/useInput';
import { useToggle } from '@hooks/useToggle';
import { storeUserInfo } from '@utils/storeUserInfo';

const NameInfo = ({ userInfo }: { userInfo: any }) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.user.userData, shallowEqual);
  const doNotLogout = useAppSelector(state => state.user.userData.doNotLogout);
  const [nameEdit, toggleNameEdit] = useToggle(false);

  // const {
  //   value: name,
  //   isValid: nameIsValid,
  //   hasError: nameHasError,
  //   valueChangeHandler: onChangeName,
  //   inputBlurHandler: onBlurName,
  // } = useInput();

  // const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!nameIsValid) return;

  //   const { userUpdated } = await dispatch(updateUserNameThunk({ name, doNotLogout })).unwrap();
  //   storeUserInfo(userData.doNotLogout, userUpdated);
  // };

  return (
    <>
      {/* 이름 */}
      <div className="pt-3 pb-3 mb-2 d-flex align-items-center">
        <div className="me-3" style={{ width: '100px' }}>
          이름
        </div>
        <div className="flex-fill">
          <div className="p-2 d-flex align-items-center justify-content-between bg-light">
            <p className="m-0">
              <strong>{userInfo.name}</strong>
            </p>
            <button onClick={toggleNameEdit}>{nameEdit ? '이름 변경 취소' : '이름 변경'}</button>
          </div>
          {nameEdit && (
            <>
              <form className="d-flex align-items-center mt-3">
                {/* <Form.Group controlId="validationCustom01" className="me-3">
                  <Form.Control
                    required
                    type="text"
                    placeholder="변경할 이름"
                    name="name"
                    value={name}
                    onChange={onChangeName}
                    onBlur={onBlurName}
                  />
                </Form.Group> */}
                <button type="submit">변경하기</button>
              </form>
              {/* <Alert variant="danger" show={nameHasError} className="mt-3">
                이름을 확인해 주세요.
              </Alert> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NameInfo;
