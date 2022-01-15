import React, {useState,useContext} from 'react'
import { TableContext } from '../provider/TableProvider'
import style from '../css/Table.module.css' 
import IconButton from '@mui/material/IconButton';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { reName } from '../extensions/reNameData' 
import { searchData } from '../extensions/searchData'
function ColumnInTable(props) { 
    const tableContext = useContext(TableContext) 
    const [sort,setSort] = useState('ascending')
    const [targetSort, setTargetSort] = useState(0) 
    const [searchFiller, setSearchFillter ] =useState([ ]) /** SORT ALLOW FILLTER */
    const convertHandle = (obj) => {
        return Object.entries(obj)
    }     
    // Name Column for Search
    setSearchFillter(['title'])
    React.useEffect(() => {
        // Test search
        console.log(tableContext.dataStorage ? searchData(tableContext.dataStorage, searchFiller,tableContext.keySearch) :'')
    },[searchFiller,tableContext.dataStorage,tableContext.keySearch])
    return (
        <>  
        {
            !tableContext.columnSearch.includes(tableContext.columns[props.index]) && <><tr className="text-capitalize">  
            <th className={`${style.headerTable} p-3 text-center`}>
                <div className={`${style.headerTable} d-flex justify-content-center align-items-center `}>
                    {reName( tableContext.columnSearch.length ? tableContext.columns[  props.index  ] : tableContext.columns[  props.index  ])} 
                    {
                        sort==='ascending' &&  
                        <IconButton 
                            aria-label="sort"
                            onClick={() => { 
                                setSort('descending') 
                                // console.log(convertHandle(data[index]))
                                setTargetSort(props.index) 
                            }}>
                                <ArrowCircleUpIcon />
                        </IconButton> 
                    }
                    {
                        sort==='descending' &&  
                        <IconButton 
                            aria-label="sort"
                            onClick={() => { 
                                setSort('ascending') 
                                // sortBy(title)
                                setTargetSort(props.index) 
                            }}>
                                <ArrowCircleDownIcon />
                        </IconButton> 
                    }
                </div>
            </th>  
        </tr> 
        {
            tableContext.dataStorage.sort(function (a, b) {  
                if (sort ==='descending') {   
                    if(typeof(convertHandle(a)[targetSort][1]) === "number" ) {
                        return convertHandle(a)[targetSort][1] - convertHandle(b)[targetSort][1]
                    }
                    else {
                        return convertHandle(a)[targetSort][1].toString().localeCompare(convertHandle(b)[targetSort][1].toString());
                    } 
                }
                else if (sort ==='ascending') { 
                    if(typeof(convertHandle(b)[targetSort][1]) === "number" ) {
                        return convertHandle(b)[targetSort][1] - convertHandle(a)[targetSort][1]
                    }
                    else {
                        return convertHandle(b)[targetSort][1].toString().localeCompare(convertHandle(a)[targetSort][1].toString());
                    }
                }
                else {
                    return false;
                }
            })
            (tableContext.dataStorage ? searchData(tableContext.dataStorage, searchFiller,tableContext.keySearch) :'').map((row,index) =>  
                <tr className={style.rowData} key={index}>
                    {      
                        <td className='text-left' >
                            <div className={`${style.formatText} px-3 py-3 text-start`}> 
                                {   
                                    tableContext.dataStorage[index] ?  
                                    reName(convertHandle(row)[props.index][1]) : 
                                    ''
                                }
                            </div>
                        </td>  
                    }
                </tr>
            )
         } </>
        }
        {
           tableContext.columnSearch.includes(tableContext.columns[props.index]) && ''
        }
        </>
    )
}

export default ColumnInTable
