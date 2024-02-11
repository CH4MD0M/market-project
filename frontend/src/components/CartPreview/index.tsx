import { useAppDispatch } from '@hooks/reduxHooks';
import { removeFromCart, updateCart } from '@redux/modules/cartSlice';
import addCommasToNumber from '@utils/addCommasToNumber';

interface CartPreviewProps {
  item: CartProduct;
}

const CartPreview = ({ item }: CartPreviewProps) => {
  const dispatch = useAppDispatch();

  const changeCountHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateCart({ ...item, quantity: Number(e.target.value) }));
  };

  const removeCartItemHandler = () => {
    dispatch(removeFromCart({ _id: item._id }));
  };

  return (
    <div>
      {/* <Row>
        <Col md={2}>
          <Image crossOrigin="anonymous" src={item?.image.path ?? null} fluid />
        </Col>
        <Col md={2}>{item.name}</Col>
        <Col md={2}>
          <b>{numberWithCommas(item.price)}원</b>
        </Col>
        <Col md={3}>
          <Form.Select onChange={changeCountHandler} value={item.quantity}>
            {[...Array(item.count).keys()].map(x => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={3}>
          <Button type="button" variant="secondary" onClick={removeCartItemHandler}>
            <i className="bi bi-trash" />
          </Button>
        </Col>
      </Row> */}
    </div>
  );
};

export default CartPreview;
