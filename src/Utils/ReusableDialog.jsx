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
  validationErrors,
}) => {
  const [data, setData] = useState({});
  // const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (visible) {
      setData(initialValues || {});
     // Clear validation errors when the dialog is opened
    }
  }, [visible, initialValues]);

  const handleFieldChange = (fieldName, value) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    // Clear the validation error for the field

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate each field before submitting
   

 
      onSubmit(data);
  
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
                 {validationErrors && validationErrors[field.name] && (
                <div className="p-error">{validationErrors[field.name]}</div>
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
                 {validationErrors && validationErrors[field.name] && (
                <div className="p-error">{validationErrors[field.name]}</div>
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