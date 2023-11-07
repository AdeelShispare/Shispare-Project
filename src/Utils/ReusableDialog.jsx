import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./ReusableDialog.css";
import { Dropdown } from "primereact/dropdown";

const ReusableDialog = ({
  visible,
  onHide,
  title,
  fields,
  onSubmit,
  buttonLabel,
  initialValues,
  width,
  height,
  onDesignationChange,
  onDepartmentChange,
  onProjectChange,
  onuserChange,
}) => {
  const [data, setData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (visible) {
      setData(initialValues || {});
      setValidationErrors({}); // Clear validation errors when the dialog is opened
    }
  }, [visible, initialValues]);

  const handleFieldChange = (fieldName, value) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    // Clear the validation error for the field
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: undefined,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate each field before submitting
    const errors = {};
    fields.forEach((field) => {
      if (field.required && !data[field.name]) {
        errors[field.name] = `${field.label} is required.`;
      }
      if (field.name === 'password') {
        if (!data[field.name]) {
          errors[field.name] = 'Password is required.';
        } else if (data[field.name].length < 8) {
          errors[field.name] = 'Password must be at least 8 characters.';
        }
      }
     
    });

    if (Object.keys(errors).length === 0) {
    
      onSubmit(data);
    } else {
      
      setValidationErrors(errors);
    }
  };

  return (
    <Dialog
      header={<div className="dialog-title">{title}</div>}
      visible={visible}
      onHide={onHide}
      style={{ width: width, height: height }}
    >
      <form onSubmit={handleSubmit}>
        <div className="fields-container">
          {fields.map((field, index) => (
            <div key={index} className="field">
              <p>{field.label}:</p>
              {field.type === "dropdown" ? (
                <div>
                  <Dropdown
                    value={data[field.name] || ""}
                    options={field.options}
                    filter
                    optionLabel="label"
                    optionValue="value"
                    onChange={(e) => {
                      handleFieldChange(field.name, e.value);
                    }}
                    placeholder={`Select ${field.label}`}
                    className="inputfieldgap drp"
                  />
                  {validationErrors[field.name] && (
                    <small className="p-error">{validationErrors[field.name]}</small>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                  
                    max={field.max}
                    min={field.min}
                    value={data[field.name] || ""}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className="inputfieldgap"
                  />
                  {validationErrors[field.name] && (
                    <small className="p-error">{validationErrors[field.name]}</small>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <Button label={buttonLabel} type="submit" className="reusablebtn" />
      </form>
    </Dialog>
  );
};

export default ReusableDialog;
