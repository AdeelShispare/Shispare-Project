import React, { useState,useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import './ReusableDialog.css'; // Import the CSS file to style the dialog

const ReusableDialog = ({ visible, onHide, title, fields, onSubmit,buttonLabel,initialValues  }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    if (visible) {
      setData(initialValues || {}); // Use the provided initialValues or an empty object
    }
  }, [visible, initialValues]);
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
    <Dialog header={title} visible={visible} onHide={onHide} style={{ width: '50vw' }}>
      <form onSubmit={handleSubmit}>
        <div className="fields-container">
          {fields.map((field, index) => (
            <div key={index} className="field">
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
        </div>
        <Button label={buttonLabel} type="submit" />
      </form>
    </Dialog>
  );
};

export default ReusableDialog;
