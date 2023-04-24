import React from 'react';
import { Form } from 'react-bootstrap';

const AttributesFilter = () => {
  return (
    <>
      {[
        { 색상: ['red', 'green', 'blue'] },
        {
          사이즈: ['S', 'M', 'L', 'XL', 'XXL'],
        },
      ].map((item, idx) => (
        <div key={idx} className="mb-3">
          <Form.Label>
            <b>{Object.keys(item)}</b>
          </Form.Label>
          {Object.values(item)[0].map((value, idx) => (
            <Form.Check type="checkbox" id="default-checkbox" label={value} />
          ))}
        </div>
      ))}
    </>
  );
};

export default AttributesFilter;
