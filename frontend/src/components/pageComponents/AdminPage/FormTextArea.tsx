import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import debounce from 'lodash/debounce';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setProductFormInput } from '@redux/modules/productSlice';

interface FormTextAreaProps {
  name: keyof ProductFormInputType;
  label: string;
  defaultValue?: string | number;
}

const FormTextArea = ({ name, label, defaultValue }: FormTextAreaProps) => {
  const dispatch = useAppDispatch();

  const productFormInputs = useAppSelector(state => state.product.productFormInputs, shallowEqual);
  const handleInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      dispatch(setProductFormInput({ field: name, value }));
    }, 500),
    [dispatch],
  );

  return (
    <div className="flex items-center mb-5">
      <span className="block min-w-[120px] font-semibold text-[18px]">{label}</span>
      <textarea
        className="p-2 border border-gray-300 rounded-md h-[200px] w-full"
        name={name}
        defaultValue={defaultValue || productFormInputs[name]}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default FormTextArea;
