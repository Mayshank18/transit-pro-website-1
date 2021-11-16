import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { db } from "../firebase";
import global from "./global";


export default function OrganizationPage() {
  const companyRef = useRef();
  const phonenumberRef = useRef();
  const whatsappnumberRef = useRef();
  const addressRef = useRef();
  const emailref=useRef();
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  

  async function handleSubmit(e){
    e.preventDefault();
    
    //console.log(companyRef.current.value+" "+phonenumberRef+" "+addressRef);
    db.collection("Org")
    .add({
      Company: companyRef.current.value,
      Phone: phonenumberRef.current.value,
      Whatsapp: whatsappnumberRef.current.value,
      Address: addressRef.current.value,
      Email: emailref.current.value,
      
    })
    .then(() => {
      alert("Your details have been submitted👍");
      
      global.signupState=true;
      console.log(global.signupState+" "+global.globalEmail);
    
    })
    .catch((error) => {
      alert(error.message);
      
    });
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


  return (
    <div className="container">
      <h2>Organization details</h2>
      <form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <strong>Logged in as:</strong> {currentUser.email}
        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Company Name"
            className="form-control"
            id="company"
            ref={companyRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            placeholder="Address"
            className="form-control"
            id="address"
            ref={addressRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="email"
            placeholder="anyone@example.com"
            className="form-control"
            id="email"
            ref={emailref}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phonenumber" className="form-label">
            Phone Number
          </label>
          <input
            type="number"
            placeholder="Phone number"
            className="form-control"
            id="phonenumber"
            ref={phonenumberRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="whatsappnumber" className="form-label">
            Whatsapp Number
          </label>
          <input
            type="number"
            placeholder="Whatsapp Number"
            className="form-control"
            id="whatsappnumber"
            ref={whatsappnumberRef}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-success">
          Submit
        </button>
        <button
          
          className="btn btn-sm btn-success"
          onClick={handleLogout}
        >
          Logout
        </button>
      </form>
    <button onClick={()=>{
     
      if (!global.signupState) {
        return setError("Please fill the form details to continue.");
      }
         

      history.push("/profile");
    }}>Proceed</button>
    </div>
  );
}
