
const searchData = (row, columnSearch, keySearch) => { 
    return  row.filter((row) => 
            columnSearch.some(
                        (columnFilter) => row[columnFilter] && row[columnFilter].toString().toLowerCase().indexOf(keySearch.toLowerCase()) > -1
                )
            ); 
}   

export {searchData}