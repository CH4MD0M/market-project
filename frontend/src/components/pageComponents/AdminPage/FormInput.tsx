import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import debounce from 'lodash/debounce';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setProductFormInput } from '@redux/modules/productSlice';

interface FormInputProps {
  name: keyof ProductFormInputType;
  type: string;
  label: string;
  defaultValue?: string | number;
}

const FormInput = ({ name, type, label, defaultValue }: FormInputProps) => {
  const dispatch = useAppDispatch();

  const productFormInputs = useAppSelector(state => state.product.productFormInputs, shallowEqual);
  const handleInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      dispatch(setProductFormInput({ field: name, value }));
    }, 500),
    [dispatch],
  );

  return (
    <div className="flex items-center mb-5">
      <span className="block min-w-[120px] font-semibold text-[18px]">{label}</span>
      <input
        className="px-2 border border-gray-300 rounded-md h-8 w-[300px]"
        name={name}
        type={type}
        defaultValue={defaultValue || productFormInputs[name]}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default FormInput;
