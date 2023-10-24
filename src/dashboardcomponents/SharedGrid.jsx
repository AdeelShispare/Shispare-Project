// SharedGrid.js
import React,{useState} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./SharedGrid.css"
import { Dropdown } from 'primereact/dropdown'; 
import { Paginator } from 'primereact/paginator';
import { Dialog } from 'primereact/dialog';
const SharedGrid = ({ data,columns,handleUpdate, handleDelete }) => {
 
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [rowClick, setRowClick] = useState(true);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [visibleUpdateForm, setVisibleUpdateForm] = useState(false); // State for showing the editing form
  const [updateFormValue, setUpdateFormValue] = useState('');
    const onPageChange = (event) => {
      setFirst(event.first);
      setRows(event.rows);
  };
  const startRecord = first + 1;
  const endRecord = Math.min(first + rows, data.length);
  const totalRecords = data.length;
  const handleDropdownSelect = (value, rowData) => {
    if (value === 'update') {
      handleUpdate(rowData.id, rowData);
    } else if (value === 'delete') {
      handleDelete(rowData.id);
    }
  };
  const dropdownItems = [
    { label: 'Update', value: 'update' },
    { label: 'Delete', value: 'delete' },
  ];
  
  return (
    <div className="shared-grid">
    <div className="card" style={{ marginLeft: "210px", marginRight: "15px" }}>
    <DataTable
          value={data}
          rows={rows}
          first={first}
          paginator={true}
          onPage={onPageChange}
          selectionMode="multiple"
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          tableStyle={{ minWidth: '50rem' }}
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown  "
          rowsPerPageOptions={[5, 10, 15,20,25]} 
          currentPageReportTemplate={`Results: ${startRecord}-${endRecord} of ${totalRecords}`}

        >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
        {columns.map((column) => (
          <Column
            key={column.field}
            field={column.field}
            header={column.header}
          />
        ))}
        {/* <Column
          header="ACTION"
          body={(rowData) => rowData.actions}
          headerStyle={{ width: "6rem" }}
        /> */}

<Column
            header="ACTION"
            body={(rowData) => (
              <Dropdown 
              value={null}
              placeholder="..."
                options={dropdownItems}
                onChange={(e) => handleDropdownSelect(e.value, rowData)}
                className="custom-dropdown"
              />
            )}
            headerStyle={{ width: "3rem" }}
          />
      </DataTable>
   
    </div>
  </div>
);
};

export default SharedGrid;