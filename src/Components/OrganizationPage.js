import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { db } from "../firebase";
import global from "./global";
import Header from "./Header";


export default function OrganizationPage() {
  const companyRef = useRef();
  const phonenumberRef = useRef();
  const whatsappnumberRef = useRef();
  const addressRef = useRef();
  const GSTRef = useRef();
  const personRef=useRef();
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  

  async function handleSubmit(e){
    e.preventDefault();
    
    //console.log(companyRef.current.value+" "+phonenumberRef+" "+addressRef);
    var docRef = db.collection("Org").doc(currentUser.email);

    
    return docRef.update({
      Company: companyRef.current.value,
     
      Address: addressRef.current.value,
      GSTINArr: [GSTRef.current.value],
       Person:personRef.current.value,
      Whatsapp: whatsappnumberRef.current.value,  
     
      
    })
    .then(() => {
      alert("Your details have been submitted👍");
      history.push("/profile");
    
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
    <>
     <Header/>
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
          <label htmlFor="GSTIN " className="form-label">
            GSTIN
          </label>
          <input
            type="text"
            placeholder="GSTIN"
            className="form-control"
            id="person"
            ref={GSTRef}
            required
          />
          </div>

        <div className="mb-3">
          <label htmlFor="person " className="form-label">
            Person of Contact
          </label>
          <input
            type="text"
            placeholder="Joe Dolla"
            className="form-control"
            id="person"
            ref={personRef}
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
   
    </div>
    </>
  );
}
