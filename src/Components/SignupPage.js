import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import Header from "./Header";
import "./SignupPage.css"
import Footer from "./Footer";
import { Helmet } from "react-helmet";
 
export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    //Email validation & verification

    if (newpassword !== confirmpassword) {
      return setError("Passwords do not match");
    }
    if(!validPhone)
    {
      return setError("Invalid Phone Number");
    }
    if(!validPass)
    {
      return setError("Password should be atleast greater than 6 Characters.");
    }
    let cancel = false;
    try {
      setError("");
      setLoading(true);
      await signup(email, confirmpassword).then(() => {
        if (cancel) return;
        setLoading(false);
      });
    history.push("/organization");
    console.log("redirecting to org page")
    } 
    catch (err) {
      setError(err.message);
      setLoading(false);
    }
    cancel = true;
    console.log(email, contact);
// End of email verification
    
    db.collection("Org")
    .doc(email)  
    .set({
        Email: email,
        GSTINArr: [],
        Company: "",
     Phone: contact,
     Person:"",
     Whatsapp: "",
     Address: "",
     INState: "",
     Trucks:0,
     Revenue:0,
     Exp_Companies:"",
     Sector:"",
     Service:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",
      1:"",

  
      })
      .then(() => {
        setLoading(false);
        console.log("Your message has been submitted👍");
        // setContact("");
        // setEmail("");
        // setNewpassword("");
        // setConfirmPassword("");
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
        setContact("");
        setEmail("");
        setNewpassword("");
        setConfirmPassword("");
      });


    return cancel;
  }

  function validatePhone(e){

   var num= e.target.value;
   if(num.length==10)
   setValidPhone(true);

  }

  function validatePassword(e){
    var pass=e.target.value;
    if(pass.length>=6)
    setValidPass(true)

    else
    setValidPass(false)

  }

  return (
    <div style={{backgroundColor:"#E5E5E5"}}>
      <Helmet>
        <title>Transit Pro | Create a new Account</title>
      </Helmet>
    <Header/>

    <div className="sign-container">
    <div className="sign-parent" >
     
      <h2>Create a fresh account with us!</h2>

      <form onSubmit={handleSubmit} className="sign-form">
        {error && <Alert variant="danger">{error}</Alert>}
        <div >
          <label htmlFor="contact" >
            Contact Number
          </label>
          <input
            type="number"
            placeholder="phone number"
            
            id="contact"
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
              validatePhone(e);
            }}
            //ref={contactRef}
            required
          />
        </div>
        <div >
          <label htmlFor="email" >
            Email
          </label>
          <input
            type="email"
            placeholder="someone@organization.com"
            
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            //ref={emailRef}
            required
          />
        </div>
        <div >
          <label htmlFor="newpassword" >
            Setup Password
          </label>
          <input
            type="password"
            placeholder="password"
            
            id="newpassword"
            //ref={newpasswordRef}
            value={newpassword}
            onChange={(e) => {setNewpassword(e.target.value)
            validatePassword(e);
            }}
            required
          />
        </div>
        <div >
          <label htmlFor="confirmpassword" >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="password"
            
            id="confirmpassword"
            //ref={confirmpasswordRef}
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="center">
        <button
          type="submit"
          className="sub-button"
          disabled={loading}
        >
          Signup
        </button>
        </div>
      </form>
      <div className="reset-parent">
       
        <Link to="/login"className="reset">Already a customer? Login.</Link>
      </div>
    </div>
    </div>
    <Footer/>
    </div>
  );
}
