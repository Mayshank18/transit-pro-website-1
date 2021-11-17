import React, { useState } from 'react'
import "./Navbar.css"
import logo from '../images/homepage.png'
import { NavLink,Route,BrowserRouter as Router,Switch } from 'react-router-dom'
import ProfileDashboard from './ProfileDashboard'
import HomePage from './HomePage'
import LandingPage from './LandingPage'
import { useHistory } from "react-router-dom";



export default function Navbar() {


    const [error, setError] = useState("");
const history = useHistory();

async function handleLogout() {
    setError("");

    try {
      await handleLogout();
      history.push("/");
    } catch (err) {
      setError(err.message);
    //   alert(error);
    }
  }
    return (
       
       
         <div className="navParent">
     <div className="navigation">
         
         <NavLink exact to="/" className="link" style={{textAlign:"left"}}>
         <img src={logo} className="logo"/>    
         </NavLink>           
            
 
         <ul className="nav-pills">
             <li>
             <NavLink exact to="/landing" className="link" activeClassName="active"> Home</NavLink>
                
             </li>
 
             <li>
                 
                 <NavLink exact to="/profile" className="link" activeClassName="active"> Profile</NavLink>
             </li>
 
            <li>
                <button className="bt-logout" onClick={handleLogout}>Logout</button>
            </li>
         </ul>
         </div>
         </div>
    );
 
      
}
