import React,{useContext} from "react"; 
import FileSaver from "file-saver";
import XLSX from "xlsx";
import Button from '@mui/material/Button';
import { TableContext } from '../provider/TableProvider'    
function ExportExcel(props) {
  const tableContext = useContext(TableContext)  
  const exportToCSV = (csvData, fileName) => { 
      csvData.map( el => {
        tableContext.columnSearch.map( column => {return delete el[`${column}`] }) 
      }) 
      // console.log(csvData)
      // console.log(tableContext.columnSearch)
      const ws = XLSX.utils.json_to_sheet([]);
      XLSX.utils.sheet_add_json(ws, csvData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer] );
      FileSaver.saveAs(data, fileName + '.xlsx');  
  } 
  return (
    <Button variant="contained" color="success"
    onClick={() => exportToCSV(props.csvData, props.fileName )}
  >
    Export XLSX
  </Button>
  )
}

export default ExportExcel
