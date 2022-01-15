import React, {useContext  } from 'react' 
import { TableContext } from '../provider/TableProvider'
function Search() {
    const tableContext = useContext(TableContext)  
    return (
        <>
        <div className="d-flex mb-5 px-5 py-3 search-box">
            <input 
                className="px-4 py-2"
                placeholder="Search"
                type='text' 
                onChange={(e) => {
                    tableContext.setKeySearch(e.target.value) 
                }} 
                value={tableContext.keySearch}  
        /> 
        </div>
        </>
    )
}

export default Search
