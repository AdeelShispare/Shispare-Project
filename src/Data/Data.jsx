import React,{useState,useEffect} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const Data = () => {
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
  
    
    //   useEffect(() => {
    //     async function fetchData() {
    //       try {
    //         const data = await ProductService.getProductsMini();
    //         setProducts(data);
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //     }
    //     fetchData();
    //   }, []);
      const data = [];

  for (let i = 3; i <= 17; i++) {
    const entry = {
      id: i,
      employeeNumber: `EMP00${i}`,
      employeeName: `Employee ${i}`,
      attendanceDate: '2023-01-07',
      changeType: i % 2 === 0 ? 'In' : 'Out',
      status: i % 3 === 0 ? 'Approved' : 'Pending',
      approval: `profile_pic_${i}.jpg`,
      addedOn: `2023-01-07 ${(i % 12) + 1}:${(i % 60).toString().padStart(2, '0')} ${i < 12 ? 'AM' : 'PM'}`,
      action: '...'
    };
    
    data.push(entry);
  }
  return (
    <div>
          <div className="card" style={{marginLeft:"200px"}}>
           
           <DataTable value={data} selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
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
       </div>
    </div>
  )
}

export default Data