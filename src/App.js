import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Wallet from "./pages/Wallet";
import AddTransaction from "./pages/AddTransaction";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                {/* <Route path="/dashboard" element={<DashboardPage/>} /> */}
                <Route path="/transactions" element={<Transaction/>} />
                <Route path="/wallet" element={<Wallet/>} />
                <Route path="/addtransaction" element={<AddTransaction/>} />

                <Route path="/" />
            </Routes>
        
        
        </BrowserRouter>

        
    </div>
  );
}

export default App;
