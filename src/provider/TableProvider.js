import React, { useState ,  createContext,useLayoutEffect} from 'react' 
import axios from 'axios'    
const TableContext = createContext() 
function TableProvider({children}) { 
    const [dataStorage, setDataStorage] = useState([]) 
    const [keySearch, setKeySearch] = useState('')  
    const [pageData, setPageData] = useState(1)
    const columns =  dataStorage[0] ? Object.keys( dataStorage[0]) : [] 
    const [columnSearch, setColumnSearch] = useState([])     
    const [searchFiller, setSearchFillter ] =useState([]) /** SORT ALLOW FILLTER */ 
    useLayoutEffect(() => { 
        axios.post('http://o-research-dev.orlab.com.vn/api/v1/filters/filter/', {
            "page": pageData,
            "pageSize": 5
        })
        .then(res => {     
            setDataStorage(res.data.data) 
            setSearchFillter(res.data.data[0] ? Object.keys( res.data.data[0]) : [] )
        })
        .catch(err => console.log(err))  

    }, [pageData])    
    const value = {
        columns,
        dataStorage,
        setDataStorage, 
        keySearch,
        setKeySearch,
        searchFiller,
        setSearchFillter,
        columnSearch,
        setColumnSearch,
        pageData,
        setPageData, 
    }
    return (
        <TableContext.Provider value={value}> 
            {children}
        </TableContext.Provider> 
    )
}
export { TableProvider, TableContext }