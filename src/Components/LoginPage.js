import React, { useState, useRef } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useHistory } from "react-router-dom";
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

  function handleAlert(){
    document.getElementById('alert-container').style.display='none'; 
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    let cancel = false;
    try {
      
      setError("");
    
      await login(emailRef.current.value, passwordRef.current.value).then(()=>{
        if (cancel) return;
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
  <div className="centerlog">
      
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="log-form">
        {error && <div className="alert-container" id="alert-container">
        
            <div className="alert">
                <span className="closebtn" onClick={handleAlert}>×</span>
                Username Or Password is Incorrect
            </div>
        
        </div>}
        
        <div className="text_field1">
          <input type="text" id="email" required ref={emailRef}/>
          <label for="email">Email</label>
        </div>
        <div className="text_field2">
          <input type="password" id="password" required ref={passwordRef}/>
          <label for="password">Password</label>
        </div>
      <Link to="/forgot-password" className="pass">Forgot Password?</Link>
       <div className="subBut">
      <input
          type="submit"
          value="Login" />
        </div>
        <div className="signup_link">
          Not a member?
          <Link to="/signup"className="reset">Signup</Link>
        </div>
      </form>  
    </div>
   <Footer/>
 
    </div>
  );
}