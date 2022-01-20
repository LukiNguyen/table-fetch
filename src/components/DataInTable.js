import React, {useState,useContext, useEffect} from 'react'
import style from '../css/Table.module.css' 
import IconButton from '@mui/material/IconButton';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { TableContext } from '../provider/TableProvider'  
import { reName } from '../extensions/reNameData' 
import {convertHandle } from '../extensions/convertHandle'
import { searchData } from '../extensions/searchData' 
import styled from "styled-components";
function DataInTable({data}) {  
    const [sort,setSort] = useState('ascending')
    const [targetSort, setTargetSort] = useState(0)  
    const tableContext = useContext(TableContext)  

    //////////////////////////////////////////////////
    const [columns, setColumns] = useState(data[0] && Object.keys(data[0]));
    useEffect(()=> {
        setColumns(data[0] && Object.keys(data[0]) )
    },[data])
    console.log(columns)
    const [rows, setRows] = useState(data);
    const [dragOver, setDragOver] = useState("");

    const handleDragStart = e => {
        const { id } = e.target;
        const idx = columns.indexOf(id);
        e.dataTransfer.setData("colIdx", idx);
      };
    
      const handleDragOver = e => e.preventDefault();
      const handleDragEnter = e => {
        const { id } = e.target;
        setDragOver(id);
      };
    
      const handleOnDrop = e => {
        const { id } = e.target;
        const droppedColIdx = columns.indexOf(id);
        const draggedColIdx = e.dataTransfer.getData("colIdx");
        const tempCols = [...columns];
    
        tempCols[draggedColIdx] = columns[droppedColIdx];
        tempCols[droppedColIdx] = columns[draggedColIdx];
        setColumns(tempCols);
        setDragOver("");
        console.log(droppedColIdx)
      }; 
    const Td = styled.td`    
    transition: all .2s;
      border-left: ${({ dragOver }) => dragOver && "2px solid #fff"};
    `; 

    return (
        <>
             <table  
                className={`${style.table} mb-5` } 
                cellPadding={20} 
                cellSpacing={10} 
                style={{margin:'0 auto'}}>    
                <thead >
                    <tr className="text-capitalize">{columns &&
                         columns.filter(val => !tableContext.columnSearch.includes(val)).map((title,index) =>   
                                <th
                                    id={title}
                                    className={`${style.headerTable} p-3 text-center`}
                                    key={title}
                                    draggable
                                    onDragStart={handleDragStart}
                                    onDragOver={handleDragOver}
                                    onDrop={handleOnDrop}
                                    onDragEnter={handleDragEnter}
                                    dragOver={title === dragOver}
                                >
                                <div className={`${style.headerTable} d-flex justify-content-center align-items-center `}>
                                    {reName(title)} 
                                    {
                                        sort==='ascending' &&  
                                        <IconButton 
                                            aria-label="sort"
                                            onClick={() => { 
                                                setSort('descending')  
                                                setTargetSort(data[0] && Object.keys(data[0]).indexOf(title)) 
                                                console.log(columns.indexOf(title))
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
                                                setTargetSort(data[0] && Object.keys(data[0]).indexOf(title)) 
                                                console.log(columns.indexOf(title))
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
                        (data ? searchData(data, tableContext.searchFiller.filter(val => !tableContext.columnSearch.includes(val)),tableContext.keySearch) :'').sort(function (a, b) {  
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
                                    columns.filter(val => !tableContext.columnSearch.includes(val)).map((column,index) => 
                                        <Td key={index} dragOver={columns[index] === dragOver}  >   
                                            <div className={`${style.formatText} px-3`}>
                                                {row[column]}
                                            </div> 
                                        </Td>
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
