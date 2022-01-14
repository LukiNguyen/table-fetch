import React, {useContext } from 'react'
import { TableContext } from '../provider/TableProvider'
function Search(props) {
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
                    console.log(tableContext.keySearch)
                }} 
                value={tableContext.keySearch}  />
                <div className="layout-ul overflow-auto py-2">
            <ul className="d-flex align-items-center mb-0 tag">
                {
                    props.column && 
                    props.column.map((columnName,index) => 
                        <li key={index} onClick={(e) => {
                            tableContext.setColumnSearch(prev => [...prev, e.target.textContent]) 
                            console.log(tableContext.columnSearch)
                        } 
                        }>
                            {columnName}
                        </li>)
                } 
            </ul>
            </div>
        </div>
        </>
    )
}

export default Search
