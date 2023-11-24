import { ElementType } from 'react';
import { Form } from 'react-bootstrap';

interface FormInputProps {
  name: string;
  type: string;
  controlId: string;
  label: string;
  as?: ElementType;
  defaultValue?: string | number;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  name,
  type,
  controlId,
  label,
  as,
  defaultValue,
  handleInputChange,
}: FormInputProps) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        required
        type={type}
        as={as || undefined}
        defaultValue={defaultValue || ''}
        onChange={handleInputChange}
      />
    </Form.Group>
  );
};

export default FormInput;
