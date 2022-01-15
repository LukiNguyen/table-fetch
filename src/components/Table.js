import React, { useContext} from 'react' 
import { TableContext } from '../provider/TableProvider'  
import Search from './Search'
import Paginations from './Paginations'
import ExportExcel from './ExportExcel'
import Switch from './Switch'
import DragColum from '../extensions/dragColumn'
// import DataInTable from './DataInTable'
function Table() { 
    const tableContext = useContext(TableContext)  
    const column =  tableContext.dataStorage[0] && Object.keys(tableContext.dataStorage[0]) 
    return (
        <div className="container-fluid rounded-3 mt-2 py-3 px-5" >
            <h2 className="text-center mb-4" style={{color:"#fff"}}>Table Fecth</h2>
            <div className="row">
                <div className="col-sm-9">
                    <Search column = {column}/> 
                    {/* <DataInTable data={ tableContext.dataStorage } />  */}
                    <DragColum numberItems={ (tableContext.columns.filter(val => !tableContext.columnSearch.includes(val))).length } />   
                    <Paginations /> 
                </div>
                <div className="col-sm-3 d-flex flex-column">
                    <div className="overflow-auto mb-2"  style={{maxHeight:"400px"}}>
                        {tableContext.dataStorage[0] &&
                            column.map((title,index) =>  <Switch title={title} key={index}/> 
                        )}
                    </div>
                    <ExportExcel 
                        csvData={tableContext.dataStorage}
                        fileName="OrLab Data" />
                </div>
            </div>
        </div>
    )
}

export default Table