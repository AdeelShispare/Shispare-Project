// ReusableDialog.js

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';


const ReusableDialog = ({ visible, onHide, title, fields, onSubmit }) => {
  const [data, setData] = useState({});

  const handleFieldChange = (fieldName, value) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <Dialog header={title} visible={visible} onHide={onHide}  style={{ width: '50vw', top: 350, right: 50 }}>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index}>
            <p>{field.label}:</p>
            <input
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={data[field.name] || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
            />
          </div>
        ))}
        <Button label="Submit" type="submit" />
      </form>
    </Dialog>
  );
};

export default ReusableDialog;
