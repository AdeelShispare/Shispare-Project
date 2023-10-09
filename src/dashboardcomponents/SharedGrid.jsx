// SharedGrid.js
import React,{useState,useEffect} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SharedGrid = ({ data,columns }) => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [rowClick, setRowClick] = useState(true);
    
  return (
    <div className="shared-grid">
      <div className="card" style={{marginLeft:"210px",marginRight:"15px"}}>
           
           <DataTable value={data} paginator rows={8} selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
               <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
               {columns.map((column) => (
          <Column
            key={column.field}
            field={column.field}
            header={column.header}
            
          />
        ))}
           </DataTable>
       </div>
    </div>
  );
};

export default SharedGrid;
