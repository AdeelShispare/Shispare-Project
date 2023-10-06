import React,{useState,useEffect} from 'react';
import {ProductService} from "../Data/ProductService"
import Navbar from '../Utils/Navbar.js';
import Sidebar from '../Utils/Sidebar';
import img from "../Assets/pf.png"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import SharedGrid from './SharedGrid';
import { BsPerson } from 'react-icons/bs';
import "./Dashboard.css"
import Menu from '../Utils/Menu';
function Dashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [rowClick, setRowClick] = useState(true);
  const columns = [
      {field: 'code', header: 'Code'},
      {field: 'name', header: 'Name'},
      {field: 'category', header: 'Category'},
      {field: 'quantity', header: 'Quantity'},
      {field: 'price', header: 'Price'},
      {field: 'rating', header: 'Rating'},
      {field: 'description', header: 'Description'}
  ];

   
    // useEffect(() => {
    //   async function fetchData() {
    //     try {
    //       const data = await ProductService.getProductsMini();
    //       setProducts(data);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   }
    //   fetchData();
    // }, []);
  //   // const data = [
  //   //   { id: 1, name: 'John Doe', revenue: 5000, expenses: 3000, profit: 2000 },
  //   //   { id: 2, name: 'Jane Smith', revenue: 6000, expenses: 3500, profit: 2500 },
   
  //   // ];

  const data = [];

  for (let i = 3; i <= 17; i++) {
    const entry = {
      id: i,
      employeeNumber: `EMP00${i}`,
      employeeName: `Employee ${i}`,
      attendanceDate: '2023-01-07',
      changeType: i % 2 === 0 ? 'In' : 'Out',
      status: i % 3 === 0 ? 'Approved' : 'Pending',
      approval:   <BsPerson />,
      addedOn: `2023-01-07 ${(i % 12) + 1}:${(i % 60).toString().padStart(2, '0')} ${i < 12 ? 'AM' : 'PM'}`,
      action: '...'
    };
    
    data.push(entry);
  }
  const DashboardColumns = [
    { field: 'employeeNumber', header: 'EMPLOYEE#', },
    { field: 'employeeName', header: 'EMPLOYEE' },
    { field: 'attendanceDate', header: 'ATTENDENCE DATE' },
    { field: 'changeType', header: 'CHANGE TYPE' },
    { field: 'status', header: 'STATUS' },
    { field: 'approval', header: 'APPROVALS' },
    { field: 'addedOn', header: 'ADDED ON' },
    { field: 'action', header: 'ACTION' },
    // Add more columns as needed
  ];
  return (
    <div>
    
      <Navbar/>
      <Sidebar/>
    
      <h1 >Dashboard</h1>
      <Menu/>
<SharedGrid data={data} columns={DashboardColumns} flex justify-content-center align-content-center/>

      {/* <div className="card" style={{marginLeft:"200px"}}>
           
            <DataTable value={data} selectionMode={rowClick ? null : 'checkbox'} 
            selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" 
            tableStyle={{ minWidth: '50rem' }} >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
          <Column field="employeeNumber" header="EMPLOYEE#" />
          <Column field="employeeName" header="EMPLOYEE" />
          <Column field="attendanceDate" header="ATTENDENCE DATE" />
          <Column field="changeType" header="CHANGE TYPE" />
          <Column field="status" header="STATUS" />
          <Column field="approval" header="APPROVALS" />
          <Column field="addedOn" header="ADDED ON" /> 
          <Column field="action" header="ACTION" />
          
            </DataTable>
        </div> */}




      {/* <div className="card" style={{marginLeft:"200px"}}>
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}
            className='left-50'>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div> */}

        {/* <DataTable value={data} tableStyle={{ minWidth: '50rem' }} style={{marginLeft:"200px"}}>
          <Column field="id" header="#" />
          <Column field="employeeNumber" header="Name" />
          <Column field="employeeName" header="Revenue" />
          <Column field="attendanceDate" header="Expenses" />
          <Column field="changeType" header="Profit" />
        </DataTable> */}

 

   

    </div>
  )
}

export default Dashboard
