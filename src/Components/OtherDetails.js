import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { db } from "../firebase";
import "./OrganizationPage.css"
import "./OtherDetails.css"
import Header from "./Header";
import Footer from "./Footer";
import { Checkbox } from "react-bootstrap";
import { Helmet } from "react-helmet";


export default function OtherDetails() {
  const truckRef = useRef(0);
  const revRef=useRef(0);
  const expRef=useRef("")
    const sect=useRef("");
    const serv=useRef("");
const [others,setOthers]=useState("none");
  const [error, setError] = useState("");


  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleSubmit(e){
    e.preventDefault();
 
    //console.log(companyRef.current.value+" "+phonenumberRef+" "+addressRef);
  
    
 
    var docRef = db.collection("Org").doc(currentUser.email);

   
    
    return docRef.update({
      Trucks:truckRef.current.value,
     Revenue: revRef.current.value,
     Exp_Companies: expRef.current.value,
     Sector:sect.current.value,
    Service: serv.current.value

    })
    .then(() => {
      alert("Other details have been submitted👍");
      history.push("/landing");
    
    })
    .catch((error) => {
      alert(error.message);
      
    });
  
   // console.log(truckRef.current.value+" "+revRef.current.value+" "+expRef.current.value+" "+sect.current.value+" "+serv.current.value);
  
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
 
  function otherSpecify(e){
      console.log("sector value:"+e.target.value);
      if(e.target.value==="Others")
      setOthers("block");

      else
      setOthers("none")
  }
  


  return (
    <div style={{backgroundColor:"#E5E5E5"}}>
      <Helmet>
        <title>Transit Pro|Setup your Account</title>
      </Helmet>
     <Header/>
    <div className="org-parent">
     
      <h2>Other details</h2>
      <form onSubmit={handleSubmit} className="org-form">
        {error && <Alert variant="danger">{error}</Alert>}
        <strong>Logged in as:</strong> {currentUser.email}
        <div >
          <label >
          Number of Vehicles
          </label>
          <input
            type="text"
            placeholder="No. of Vehicles"
            
            id="trucks"
            ref={truckRef}
           
          />
        </div>

        <div>
          <label>
            Revenue:
          </label>

          <select
          className="rev-select"
          
          ref={revRef}>
              <option value="">Choose..</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3+">3+</option>
              </select>
        </div>
        
        <div>
            <label >Brands Associated with:</label>
            <input type="text" 
            placeholder="e.g.: TATA,JSW"
            ref={expRef}
            />
        </div>
        <div>
            <label >Primary Sector</label>
            <select
          className="rev-select"
          onChange={otherSpecify}
          ref={sect}>
                <option value="">Choose..</option>
              <option value="FMCG">FMCG</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Others">Others</option>
               </select>
               
              <input type="text" 
                  placeholder="Please Specify"
                  ref={sect}
                  style={{display:others}}
             />
        </div>
        <div>
            <label > Service Type</label>
            <select
            
          className="rev-select"
    
          ref={serv}>
                <option value="">Choose..</option>
              <option value="FTL">FTL</option>
              <option value="PTL">PTL</option>
              <option value="FTL/PTL">Both</option>
              </select>
        </div>
        
        
        <div className="center">
        <button
          type="submit"
          className="sub-button">
          Submit
        </button>
        <button
          className="sub-button"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
        </div>
      </form>
    <div>
    <Link to="/landing" >Skip for now</Link>
    </div>
    </div>
    <Footer/>
    </div>
  );
}
