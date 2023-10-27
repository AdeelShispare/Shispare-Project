import React, { useState,useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import './ReusableDialog.css'; // Import the CSS file to style the dialog
import { Dropdown } from 'primereact/dropdown';

const ReusableDialog = ({ visible, onHide, title, fields, onSubmit,buttonLabel,initialValues,width,height,onDesignationChange, onDepartmentChange, onProjectChange, }) => {
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
    <Dialog header={<div className="dialog-title">{title}</div>} visible={visible} onHide={onHide} style={{ width: width,height }}>
    
    <form onSubmit={handleSubmit}>
      <div className="fields-container">
        {fields.map((field, index) => (
          <div key={index} className="field">
            <p>{field.label}:</p>
            {field.type === 'dropdown' ? (
              <Dropdown
                value={data[field.name] || ''}
                options={field.options}
                filter
                onChange={(e) => {
                  handleFieldChange(field.name, e.value);
                  if (field.name === 'designation') {
                    onDesignationChange(e.value);
                  } else if (field.name === 'department') {
                    onDepartmentChange(e.value);
                  } else if (field.name === 'project') {
                    onProjectChange(e.value);
                  }
                }}
                placeholder={`Select ${field.label}`}
                className='inputfieldgap drp'
              />
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                value={data[field.name] || ''}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className='inputfieldgap'
              />
            )}
          </div>
        ))}
      </div>
      <Button label={buttonLabel} type="submit"  className='reusablebtn' />
    </form>
  </Dialog>
);
};

export default ReusableDialog;
