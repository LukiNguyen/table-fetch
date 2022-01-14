import React , {useContext } from 'react'; 
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { TableContext} from '../provider/TableProvider'
export default function PaginationControlled() { 
  const tableContext = useContext(TableContext)
  const handleChange = (event, value) => {
    tableContext.setPageData(value); 
  };

  return (
    <Stack spacing={2}> 
      <Pagination count={20} page={tableContext.pageData} onChange={handleChange} />
    </Stack>
  );
}