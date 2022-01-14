import React, { useState ,  createContext,useEffect,useLayoutEffect} from 'react' 
import axios from 'axios'   
const TableContext = createContext() 
function TableProvider({children}) { 
    const [dataStorage, setDataStorage] = useState([])
    const columns =  dataStorage[0] && Object.keys( dataStorage[0])
    const [keySearch, setKeySearch] = useState('')  
    const [pageData, setPageData] = useState(1)
    const [columnSearch, setColumnSearch] = useState(columns ? columns : [])
    const [columnsHandled, setColumnHandled] = useState([])
    const search = (row) => { 
        return row.filter((row) => 
            columnSearch.some(
                    (columnFilter) => row[columnFilter].toString().toLowerCase().indexOf(keySearch.toLowerCase()) > -1
            )
        ); 
    }   

    useLayoutEffect(() => { 
        axios.post('http://o-research-dev.orlab.com.vn/api/v1/filters/filter/', {
            "page": pageData,
            "pageSize": 5
        })
        .then(res => {  
            setDataStorage(res.data.data)
        } )
        .catch(err => console.log(err))  
    }, [pageData]) 
    useEffect(() => {   
        setColumnHandled(columns ? columns.filter(e => !columnSearch.includes(e)) : [])   
    }, [columnSearch])
    const value = {
        columns,
        dataStorage,
        setDataStorage,
        keySearch,
        setKeySearch,
        columnsHandled,
        columnSearch,
        setColumnSearch,
        pageData,
        setPageData,
        search
    }
    return (
        <TableContext.Provider value={value}> 
            {children}
        </TableContext.Provider> 
    )
}
export { TableProvider, TableContext }