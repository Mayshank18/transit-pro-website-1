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
import {GrAdd,GrEdit} from "react-icons/gr"
import {BsFillPersonFill} from "react-icons/bs"
import { Helmet } from 'react-helmet';
import LoadingScreen from './LoadingScreen';
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
            
               <LoadingScreen/>
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
          function handleEdit(){
                history.push("/editdetails")

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
    <Helmet>
        <title>Transit Pro | Profile Dashboard</title>
      </Helmet>
    <Navbar/>
    <div className="profile-container">
    <div className="profile">
      
        {/* columns */}
        <div id="row-profile" style={{ height:"100vh"}}>
         <div className="column  ">
         <div className="avatar">
           

           {
               posts.length>0?
               (posts.map((post)=><h3 key={post.key} >
                   
                      {post.Company}
                   
                   </h3>) ):
               <h3>Company Name</h3>
           }

       </div>
        {
                posts.length>0?
                (posts.map((post)=><h6 key={post.key} className="state">
                    
                       {post.INState}
                    
                    </h6>) ):
               <h6 className="state">FTL/PTL</h6>
            }
         <h6>Services</h6>
         {
                posts.length>0?
                (posts.map((post)=><h6 key={post.key} className="ftl-ptl" >
                    
                       {post.Service}
                    
                    </h6>) ):
               <h6 className="ftl-ptl">FTL/PTL</h6>
            }
         
             </div>

             <div className="column  contact-person">
                 <h6>Person of Contact</h6>
                 <BsFillPersonFill className="person-avatar"/>
                 {
                posts.length>0?
                (posts.map((post)=><h6 key={post.key} >
                    
                       {post.Person}
                    
                    </h6>) ):
                <h6>Joe Carlson</h6>
            }
             </div>

             <div className="column">
                 <h6>Experienced Sectors</h6>
               
                {
                posts.length>0?
                (posts.map((post)=><li key={post.key} >
                    
                       {post.Sector}
                    
                    </li>) ):
                <li>Sector</li>
            }
                 
                
            
                 
             </div>
             <div className="column">
                 <h6>Companies Associated</h6>
                 {
                posts.length>0?
                (posts.map((post)=><li key={post.key} >
                    
                       {post.Exp_Companies}
                    
                    </li>) ):
               <li>{GrAdd}Company </li>
            }
             </div>

             </div>
                </div>
               

                 {/* profile card over */}
             {/* details card below */}
            <div className="tab-parent">
             <div className="detail-Tab">
                 <h2 >My Details</h2>
                    <div className="icon-edit" ><GrEdit style={{cursor:"pointer"}} onClick={handleEdit}/></div>
                    <div  className="icon-add" ><GrAdd style={{cursor:"pointer"}} onClick={handleList}/></div>
                    </div>
                 <div className="detailsListParent" style={{display:disp}}>
                 {
                posts.length>0?
                (posts.map((post)=><div key={post.key} className="detailsList">
                    
                    <h4>Company:  <span> {post.Company}</span></h4>
                    <h4>Address: <span>{post.Address}</span></h4>
                    <h4>Person of Contact: <span>{post.Person}</span></h4>
                    <h4>State of Business: <span>{post.INState}</span></h4>
                    <h4>GSTIN: {post.GSTINArr}</h4>
                    <h4>Revenue: <span>{post.Revenue}</span></h4>
                    <h4>Trucks: <span>{post.Trucks}</span></h4>
                    <h4>Email: <span>{post.Email}</span></h4>
                    <h4>Phone: <span>{post.Phone}</span></h4>
                    {(post.Whatsapp=="NA")?<h4>Whatsapp: <span>{post.Phone}</span></h4>:<h4>Whatsapp: <span>{post.Whatsapp}</span></h4>}
                   

                   
                    
                    </div>) ):
                <h1>No details yet.</h1>
            }
                 </div>

                 <div className="detailTab ">
                 <h2 >My Analytics</h2>
                    <div className="icon" ><GrAdd /></div>
                    </div>
                    <div className="detailTab">
                 <h2 >My Activity</h2>
                    <div className="icon" ><GrAdd /></div>
                    </div>
                    </div>
                    </div>
                <Footer/>
             


               
            
        </div>
    )
}

export default ProfileDashboard
