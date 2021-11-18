import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import "./LandingPage.css"
import { NavLink } from 'react-router-dom'
import Footer from './Footer'
import truck from "../images/truck.png"
function LandingPage() {
    return (

        <div style={{backgroundColor:"#E5E5E5"}}>
     <Navbar/>

     <div id="row" style={{ height:"100vh"}}>
         <div className="column  col-left">
         <div className="miniProfile">
             <h2>Company pvt. Ltd.</h2>
            <NavLink exact to="/profile" className="prof-link">View Profile</NavLink>
           <div className="member">
           <h5>Membership: Platinum</h5>
           </div>
         </div>
         
         </div>
         {/* middle Column */}
         <div className="column col-mid">
            <div className="reqBox">
                <img src={truck} alt="icon" />
            </div>
         </div>

         {/* Right col */}
         <div className="column  ">
            my utilities
         </div>
     </div>
     <Footer/>
     </div>
    )
}

export default LandingPage
