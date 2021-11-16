import React, { useState, useRef } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import global from "./global";
import { db } from "../firebase";

export default function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  //const [loading, setLoading] = useState(false);
  const history = useHistory();


  async function handleSubmit(e) {
    e.preventDefault();
    global.globalEmail=emailRef.current.value;
    let cancel = false;
    try {
      
      setError("");
      // setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value).then(()=>{
        if (cancel) return;
      //setLoading(false);
      })

        console.log(global.signupState+" "+global.globalEmail);
      if(!global.signupState)
      history.push("/organization");
      else
      history.push("/profile");
    } catch (err) {
       // console.log(global.signupState+" "+global.globalEmail);
        //validating account setup state
      
       var docref=db.collection("Org").doc(emailRef.current.value);
       setError(err.message);
        console.log(emailRef.current.value);
        
        docref.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                var data=doc.data();
                if(data.Company===""||data.Address===""||data.GSTINArr===[]||data.Whatsapp===""||data.Person==="")
                {
                  console.log("sent to fill organization details due to incomplete data fro organization");
                    history.push("/organization");
                }
                else{
                  console.log("send to profile page.");
                  history.push("/profile");
                }
                //history.push("/profile");
            } else {
                // doc.data() will be undefined in this case
                //history.push("/organization");
                alert("Please Signup first");

                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    
    }//try
    
      // setLoading(false);
    cancel = true;
    return cancel;
   
  }
  

  return (
    <div className="container">
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            placeholder="someone@organization.com"
            className="form-control"
            id="email"
            ref={emailRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            className="form-control"
            id="password"
            ref={passwordRef}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-success"
          // disabled={loading}
        >
          Login
        </button>
      </form>
      <div>
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
      <div>
        <Link to="/signup">Need an account</Link>
      </div>
    </div>
  );
}
