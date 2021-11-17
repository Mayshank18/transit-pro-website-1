import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import "./LandingPage.css"
function LandingPage() {
    return (

     < div >
     <Navbar/>

     <div id="row">
         <div className="column ">
            mini profile
         </div>
         <div className="column ">
             feed
         </div>
         <div className="column ">
            my utilities
         </div>
     </div>
     </div>
    )
}

export default LandingPage
