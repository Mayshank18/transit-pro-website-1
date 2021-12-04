import React, { useState, useRef } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./LoginPage.css"
import { db } from "../firebase";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

export default function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  
  const history = useHistory();


  async function handleSubmit(e) {
    e.preventDefault();
    
    let cancel = false;
    try {
      
      setError("");
    
      await login(emailRef.current.value, passwordRef.current.value).then(()=>{
        if (cancel) return;
 ;
      })

       
        //validating account setup state
      
       var docref=db.collection("Org").doc(emailRef.current.value);
        
        console.log(emailRef.current.value);
        
        docref.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                var data=doc.data();
                if(data.Phone===""||data.INState===""||data.Person=="")
                {
                  console.log("sent to fill organization details due to incomplete data fro organization");
                    history.push("/organization");
                }
                else if (data.Revenue===""||data.Trucks===0||data.Exp_Companies==="") {
                  console.log("sent to other details which are empty")
                  history.push("/otherdetails")
                }
                else{
                  console.log("send to landing page.");
                  history.push("/landing");
                }
               
            } else {
                // doc.data() will be undefined in this case
                
                alert("Please Signup first");

                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    
    }//try
     catch (err) {
      setError(err.message);
  
    }
    cancel=true;
    return cancel;
   
  }

  return (

    <div style={{backgroundColor:"#E5E5E5"}}>
    <Helmet>
        <title>Transit Pro | Login </title>
      </Helmet>
    <Header/>
  
    <div className="form-parent">
      
      <h2>Welcome back!</h2>
      <form onSubmit={handleSubmit} className="log-form">
        {error && <Alert variant="danger">{error}</Alert>}
        
          <label htmlFor="email" >
            Email
          </label>
          <input
            type="email"
            placeholder="someone@organization.com"
            
            id="email"
            ref={emailRef}
            required
          />
      
        
          <label htmlFor="password" >
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            
            id="password"
            ref={passwordRef}
            required
          />
       <div className="center">
      <button
          type="submit"
        className="sub-button" >
          Submit
        </button>
      </div>
     
      </form>
      

      <div className="reset-parent">
        <Link to="/forgot-password" className="reset">Forgot Password</Link>
      
        <Link to="/signup"className="reset">Signup?</Link>
      </div>
    </div>
   
   <Footer/>
 
    </div>
  );
}
