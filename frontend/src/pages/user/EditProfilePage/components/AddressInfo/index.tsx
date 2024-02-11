import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { updateUserAddressThunk } from '@redux/modules/userSlice/thunk';
import { useToggle } from '@hooks/useToggle';

const AddressInfo = ({ userInfo }: { userInfo: any }) => {
  const [addressEdit, toggleAddressEdit] = useToggle(false);
  const dispatch = useAppDispatch();

  const userAddress = useAppSelector(state => state.user.userAddress);

  // const {
  //   value: detailAddress,
  //   isValid: detailAddressIsValid,
  //   hasError: detailAddressHasError,
  //   valueChangeHandler: onChangeDetailAddress,
  //   inputBlurHandler: onBlurDetailAddress,
  // } = useInput(validateAddress);

  // const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!detailAddressIsValid) return;
  //   dispatch(
  //     updateUserAddressThunk({
  //       address: `${userAddress.address}, ${detailAddress}`,
  //       zipCode: userAddress.zipCode,
  //     }),
  //   );
  // };

  return (
    <div className="pt-3 pb-3 mb-2 d-flex align-items-center">
      <div className="me-3" style={{ minWidth: '100px' }}>
        주소
      </div>

      <div className="flex-fill">
        <div className="mb-3 p-2 d-flex align-items-center justify-content-between bg-light">
          <p className="m-0">
            <strong>{userInfo.address || '주소를 등록해주세요'}</strong>
          </p>
          <button onClick={toggleAddressEdit} style={{ wordBreak: 'keep-all' }}>
            {addressEdit ? ' 주소 변경 취소' : '주소 변경'}
          </button>
        </div>
        {addressEdit && (
          <form>
            {/* <Form.Group controlId="formBasicZip">
              <div className="d-flex mb-2">
                <Form.Control
                  className="flex-grow-1"
                  type="text"
                  defaultValue={userAddress.zipCode}
                  placeholder="우편번호"
                  readOnly
                  name="zipCode"
                  autoComplete="postal-code"
                />
                <Postcode />
              </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="Address">
              <Form.Control
                className="mb-2"
                type="text"
                defaultValue={userAddress.address}
                placeholder="주소"
                readOnly
                name="address"
                autoComplete="street-address"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="DetailAddress">
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="상세주소"
                name="detailAddress"
                autoComplete="street-address"
                value={detailAddress}
                onChange={onChangeDetailAddress}
                onBlur={onBlurDetailAddress}
              />
            </Form.Group>
            <Alert variant="danger" show={detailAddressHasError}>
              주소를 입력해주세요.
            </Alert>
            <Button type="submit" disabled={!detailAddressIsValid} size="sm">
              변경하기
            </Button> */}
          </form>
        )}
      </div>
    </div>
  );
};

export default AddressInfo;
