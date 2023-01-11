
import './App.css';
import { Route, Routes } from "react-router-dom";
import Transactiontable from './components/Transactiontable';
import AllTransactions from './components/AllTransactions';
import AddTransaction from './components/AddTransactionForm';



function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Transactiontable/>}></Route>
        <Route path="/transaction/create" element={<AddTransaction/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
