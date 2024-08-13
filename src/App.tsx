import './App.css'
import { useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import {
  ColDef,
  ColGroupDef,
  GridReadyEvent,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the Data Grid
interface IOlympicData {
  athlete: string,
  age: number,
  country: string,
  year: number,
  date: string,
  sport: string,
  gold: number,
  silver: number,
  bronze: number,
  total: number
}
function App() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<object[]>([
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<(ColDef | ColGroupDef)[]>([
    { field: "athlete" },
    { field: "sport" },
    { field: "age" },
  ])

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch("http://localhost:5000/fire_aml")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);
  return (
    <>
      <div
        className="ag-theme-balham" // applying the Data Grid theme
        style={{ height: 500, width: 1000 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowStyle={{ textAlign: "left" }}
          rowData={rowData}
          columnDefs={colDefs}
          onGridReady={onGridReady}
        />
      </div>
    </>
  )
}

export default App
