// SharedGrid.js
import React,{useState} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./SharedGrid.css"
const SharedGrid = ({ data,columns }) => {
 
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [rowClick, setRowClick] = useState(true);
    
  return (
    <div className="shared-grid">
    <div className="card" style={{ marginLeft: "210px", marginRight: "15px" }}>
      <DataTable
        value={data}
        paginator
        rows={7}
        selectionMode="multiple"
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
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
      </DataTable>
    </div>
  </div>
);
};

export default SharedGrid;