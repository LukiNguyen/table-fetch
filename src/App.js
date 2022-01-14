import './App.css';
import Tabel from './components/Table'
import {TableProvider} from './provider/TableProvider'
function App() {
  return (
    <> 
    <TableProvider >
       <Tabel />
    </TableProvider>
    </>
  );
}

export default App;
