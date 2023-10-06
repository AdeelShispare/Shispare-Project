import React, { useState } from 'react';

const EditRecordModal = ({ record, onClose, onSave }) => {
  const [editedRecord, setEditedRecord] = useState(record);

  const handleFieldChange = (e, field) => {
    const updatedRecord = { ...editedRecord };
    updatedRecord[field] = e.target.value;
    setEditedRecord(updatedRecord);
  };

  const handleSave = () => {
    onSave(editedRecord);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Record</h2>
        <label>
          Employee Number:
          <input
            type="text"
            value={editedRecord.employeeNumber}
            onChange={(e) => handleFieldChange(e, 'employeeNumber')}
          />
        </label>
        {/* Add more input fields for other record properties */}
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditRecordModal;
