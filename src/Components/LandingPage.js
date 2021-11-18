import React, { useEffect, useState } from 'react'
import Header from './Header'
import Navbar from './Navbar'
import { useAuth } from "../Contexts/AuthContext";
import {auth, db} from "../firebase"
import "./LandingPage.css"
import { NavLink } from 'react-router-dom'
import Footer from './Footer'
import truck from "../images/truck2.png"
import loadgif from "../images/load.gif"

function LandingPage() {
    
    const { currentUser, logout } = useAuth();
        const [loading,setLoading]=useState(true);
        const [posts,setPosts]=useState([]);
     

    useEffect(() => {
        const getdatafromFirebase=[];
        const sub=db.collection("Org")
        .where("Email","==", currentUser.email)
        .get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                getdatafromFirebase.push({...doc.data(), key: doc.id});
            });
            setPosts(getdatafromFirebase);
            setLoading(false);
            console.log(getdatafromFirebase);
        });

        //return ()=>sub();
    }, [])
    
    if (loading)
    {
        return(
            
        <div style={{backgroundColor:"#E5E5E5", alignItems:"center"}}>
        <Navbar/>
         
            <img src={loadgif} alt="loading" className="load-img"/>
            <Footer/>
            </div>
        )
    }


    return (

 
        <div style={{backgroundColor:"#E5E5E5"}}>
     <Navbar/>

     <div id="row" style={{ height:"100vh"}}>
         <div className="column  col-left">
         <div className="miniProfile">

         {
                posts.length>0?
                (posts.map((post)=><div key={post.key}>
                    
                    <h2>{post.Company}</h2>
                    
                    
                    
                    </div>) ):
              <h2>Company pvt. Ltd.</h2>
            }

             
            <NavLink exact to="/profile" className="prof-link">View Profile</NavLink>
           <div className="member">
           <h5>Membership: Platinum</h5>
           </div>
         </div>
         
         </div>
         {/* middle Column */}
         <div className="column col-mid">
            <div className="reqBox">
                <img src={truck} alt="icon" className="reqtruck"/>
                <input type="text" className="reqinp" placeholder="Post Requirements"/>
            </div>
            <div className="liverfq">
                <h3> <span>LIVE</span> RFQs</h3>
                <div className="list-rfq">
                    <ul>
                        <li>No Live RFQ at the Moment</li>
                    </ul>
                </div>
            </div>
            <div className="feed">
                <h3>No live feed yet.</h3>
            </div>

         </div>

         {/* Right col */}
         <div className="column col-right ">
             <div className="util">
                 <h3>My Utilities</h3>
                 <button className="bt-util">RFQs</button>
                 
                 <button className="bt-util">My Analytics</button>
                 
                 <button className="bt-util">My Quotations</button>
             </div>
             <div className="data">
             <h3>My Data</h3>
             <button className="bt-util">Per Kg</button>
                 
                 <button className="bt-util">Per Tonne</button>
                 
                 <button className="bt-util">Favourite Lanes</button>
             </div>
         </div>
     </div>
     <Footer/>
     </div>
    )
}

export default LandingPage
