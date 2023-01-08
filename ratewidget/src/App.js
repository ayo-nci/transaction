
import './App.css';
import { Route, Routes } from "react-router-dom";
import AllTransactions from './pages/AllTransactions';
import AddTransaction from './pages/AddTransaction';


function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<AllTransactions/>}></Route>
        <Route path="/transaction/create" element={<AddTransaction/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
