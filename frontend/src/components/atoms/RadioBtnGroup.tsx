import { InputHTMLAttributes } from 'react';

interface RadioBtnProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface RadioBtnGroupProps {
  optionList: RadioBtnOption[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const RadioBtn = ({ id, value, label, ...rest }: RadioBtnProps) => {
  return (
    <div className="my-1 w-full">
      <input type="radio" id={id} value={value} {...rest} />
      <label htmlFor={id}>
        <span> {label}</span>
      </label>
    </div>
  );
};

const RadioBtnGroup = ({ optionList, onChange, value }: RadioBtnGroupProps) => {
  return (
    <>
      {optionList.map(({ label, name, optionValue }: RadioBtnOption) => {
        const optionId = `radio-option-${label}`;
        return (
          <RadioBtn
            key={optionId}
            id={optionId}
            value={optionValue}
            label={label}
            name={name}
            onChange={onChange}
            checked={value === optionValue}
          />
        );
      })}
    </>
  );
};

export default RadioBtnGroup;
