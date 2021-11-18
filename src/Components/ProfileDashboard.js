import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from "../Contexts/AuthContext";
import {auth, db} from "../firebase"
import "./ProfileDashboard.css"
import { useHistory } from "react-router-dom";
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import loadgif from "../images/load.gif"
import {GrAdd} from "react-icons/gr"
function ProfileDashboard() {
 
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
        const [loading,setLoading]=useState(true);
        const [posts,setPosts]=useState([]);
        const history = useHistory();
        const [disp,setDisp]=useState("none");

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
        async function handleLogout() {
            setError("");
        
            try {
              await logout();
              history.push("/");
            } catch (err) {
              setError(err.message);
            }
          }
  
          function handleList(){
              if(disp=="none")
              {
                  setDisp("block");
              }
              else
              setDisp("none");
          }

    return (
        <div style={{backgroundColor:"#E5E5E5", alignItems:"center"}}>
    <Navbar/>
    <div className="profile">
        <div className="avatar">
           

            {
                posts.length>0?
                (posts.map((post)=><h3 key={post.key} >
                    
                       {post.Company}
                    
                    </h3>) ):
                <h3>Company Name</h3>
            }

        </div>
        {/* columns */}
        <div id="row" style={{ height:"100vh"}}>
         <div className="column  ">
            <h6 className="ftl-ptl">FTL/PTL</h6>
             </div>

             <div className="column  contact-person">
                 <h6>Person of Contact</h6>
                 {
                posts.length>0?
                (posts.map((post)=><h6 key={post.key} >
                    
                       {post.Person}
                    
                    </h6>) ):
                <h6>Joe Carlson</h6>
            }
             </div>

             <div className="column  past-work">
                <ul>
                 <li>Sector</li>
                 <li>{GrAdd}Company 1</li>
                 <li>Company 2</li>
                 </ul>
             </div>

             </div>
                </div>

                 {/* profile card over */}
             {/* details card below */}
            <div className="tab-parent">
             <div id="detailTab">
                 <h2 >My Details</h2>
                    <div className="icon" onClick={handleList}><GrAdd /></div>
                    </div>
                 <div className="detailsListParent" style={{display:disp}}>
                 {
                posts.length>0?
                (posts.map((post)=><div key={post.key} className="detailsList">
                    
                    <h4>Company:   {post.Company}</h4>
                    <h4>Address: {post.Address}</h4>
                    <h4>Person of Contact: {post.Person}</h4>
                    <h4>State of Business: {post.INState}</h4>
                    <h4>GSTIN: {post.GSTINArr}</h4>
                    <h4>Email: {post.Email}</h4>
                    <h4>Phone: {post.Phone}</h4>
                    {(post.Whatsapp=="")?<h4>Whatsapp: {post.Phone}</h4>:<h4>Whatsapp: {post.Whatsapp}</h4>}
                   

                   
                    
                    </div>) ):
                <h1>No details yet.</h1>
            }
                 </div>

                 <div id="detailTab">
                 <h2 >My Analytics</h2>
                    <div className="icon" ><GrAdd /></div>
                    </div>
                    <div id="detailTab">
                 <h2 >My Activity</h2>
                    <div className="icon" ><GrAdd /></div>
                    </div>
                    </div>
                <Footer/>
             


               
            
        </div>
    )
}

export default ProfileDashboard
