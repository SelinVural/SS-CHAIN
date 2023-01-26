import { Link, Route, Routes } from "react-router-dom"
import { isAuthenticated } from "../services/Auth"
import Transactions from "../pages/Transaction"
import Wallet from "../pages/Wallet"

<Routes>
<Route path="/transactions" component={Transactions}/> <Route/>
<Route path="/wallet" component={Wallet}/> <Route/>
</Routes>

export default function NavBar(props){


    return ( <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <a className="navbar-brand" href="./Home.js">SS-CHAIN</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto"  >
                        {!isAuthenticated()?<li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>:null}
                        {!isAuthenticated()?<li><Link className="nav-link" to="/login" >Login</Link></li>:null}
                        {/* {isAuthenticated()?<li className="nav-item"><Link className="nav-link" to="/dashboard" >Dashboard</Link></li>:null} */}
                        {isAuthenticated()?<li><a className="nav-link"  onClick={props.logoutUser} style={{cursor:"pointer"}} >Logout</a></li>:null}
                        {isAuthenticated()?<li className="nav-item"><Link className="nav-link" to="/transactions" >Transactions</Link></li>:null}
                        {isAuthenticated()?<li className="nav-item"><Link className="nav-link" to="/wallet" >Wallet</Link></li>:null}

                    </ul>
                </div>
            </nav>)
}