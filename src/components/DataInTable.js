import React, {useState} from 'react'
import style from '../css/Table.module.css' 
import IconButton from '@mui/material/IconButton';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { reName } from '../extensions/reNameData' 
import {convertHandle } from '../extensions/convertHandle'
function DataInTable({data}) { 
    const columns = data[0] && Object.keys(data[0])
    const [sort,setSort] = useState('ascending')
    const [targetSort, setTargetSort] = useState(0)  
    return (
        <>
            <table  
                className={`${style.table} mb-5` } 
                cellPadding={20} 
                cellSpacing={10} 
                style={{margin:'0 auto'}}>
                <thead >
                    <tr className="text-capitalize">{data[0] &&
                        columns.map((title,index) =>  
                            <th className={`${style.headerTable} p-3 text-center`} key={title}>
                                <div className={`${style.headerTable} d-flex justify-content-center align-items-center `}>
                                    {reName(title)} 
                                    {
                                        sort==='ascending' &&  
                                        <IconButton 
                                            aria-label="sort"
                                            onClick={() => { 
                                                setSort('descending')  
                                                setTargetSort(index) 
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
                                                setTargetSort(index) 
                                            }}>
                                                <ArrowCircleDownIcon />
                                        </IconButton> 
                                    }
                                </div>
                            </th> 
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.sort(function (a, b) {  
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
                        },).map((row,index) =>  
                            <tr className={style.rowData} key={index}>
                                {
                                    columns.map((column,index) =>   
                                        <td className='text-left' key={index}>
                                            <div className={`${style.formatText} px-3`}>
                                                {row[column]}
                                            </div>
                                        </td>  
                                    )
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default DataInTable
