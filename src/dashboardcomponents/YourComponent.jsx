import React, { useState, useEffect } from "react";
import ReusableDialog from "../Utils/ReusableDialog";
// import "./YourComponent.css"

const YourComponent = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);

  // const employees = [
  //   // Your employee data
  //   {
  //     id: 1,
  //     name: "John",
  //     department: "HR",
  //     designation: "Manager",
  //   },
  //   // Add more employee data
  // ];

  const departments = [
    // Your department data
    { label: "HR", value: "hrere" },
    { label: "df", value: "df" },
    // Add more department data
  ];

  const designations = [
    // Your designation data
    { label: "Manager", value: "manager" },
    { label: "er", value: "adeel" },
    // Add more designation data
  ];

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setSelectedDepartment(employee.department);
    setSelectedDesignation(employee.designation);
    setDialogVisible(true);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    // Update the employee data in the state
    const updatedEmployees = employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);

    setDialogVisible(false);
  };

  const handleAddEmployee = (newEmployee) => {
    // Add the new employee data to the state
    setEmployees([...employees, newEmployee]);

    setDialogVisible(false);
  };

  const handleDeleteEmployee = (employeeId) => {
    // Remove the employee data from the state
    const updatedEmployees = employees.filter(
      (employee) => employee.id !== employeeId
    );
    setEmployees(updatedEmployees);
  };

  
  const handleDesignationChange = (value) => {
    setSelectedDesignation(value);
    console.log("setSelectedDesignation",value)
  };
  
  const handleDepartmentChange = (value) => {
    
    setSelectedDepartment(value);
    console.log("setSelectedDepartment",value)
  };

  return (
    <div className="employee-container" >
    <h1>Employee Management</h1>
      <button onClick={() => setDialogVisible(true)}>Add Employee</button>

      {/* Display the employee table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.designation}</td>
              <td>
                <button onClick={() => handleEditEmployee(employee)}>Edit</button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReusableDialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        title={selectedEmployee ? "Edit Employee" : "Add Employee"}
        fields={[
          {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
          },
          {
            name: "department",
            label: "Department",
            type: "dropdown",
            options: departments,
            required: true,
          },
          {
            name: "designation",
            label: "Designation",
            type: "dropdown",
            options: designations,
            required: true,
          },
        ]}
        onSubmit={selectedEmployee ? handleUpdateEmployee : handleAddEmployee}
        buttonLabel={selectedEmployee ? "Update" : "Add"}
        initialValues={selectedEmployee}
        onDesignationChange={setSelectedDesignation}
        onDepartmentChange={setSelectedDepartment}
      />
    </div>
 
  );
};

export default YourComponent;
