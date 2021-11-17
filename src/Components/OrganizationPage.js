import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { db } from "../firebase";
import "./OrganizationPage.css"
import Header from "./Header";
import Footer from "./Footer";


const GSTDict={
  "Andaman and Nicobar Islands": "35" ,
 "Andhra Pradesh" :"28" ,
"Andhra Pradesh" : "37",
  "Arunachal Pradesh": "12",
   "Assam": "18",
    "Bihar": "10",
     "Chandigarh": '04', 
     " Chattisgarh": "22",
     "Dadra and Nagar Haveli": '26',
     "Daman and Diu": "25",
 "Delhi": "07" ,
 "Goa": '30' ,
 "Gujarat": "24", 
 "Haryana" :"06" ,
 "Himachal Pradesh": "02" ,
 "Jammu and Kashmir": "01" ,
 "Jharkhand": "20" ,
 "Karnataka": "29" ,
 "Kerala" :"32" ,
 "Lakshadweep Islands": "31" ,
 "Madhya Pradesh": "23" ,
 "Maharashtra": "27" ,
 "Manipur": "14" ,
 "Meghalaya": "17" ,
 "Mizoram": "15" ,
 "Nagaland": "13" ,
 "Odisha" :"21" ,
 "Pondicherry": "34" ,
 "Punjab" :"03" ,
 "Rajasthan": "08" ,
 "Sikkim": "11" ,
 "Tamil Nadu": "33" ,
 "Telangana" :"36" ,
 "Tripura": "16" ,
 "Uttar Pradesh": "09" ,
 "Uttarakhand": "05" ,
 "West Bengal": "19" ,
}

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
      history.push("/landing");
    
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
    <div style={{backgroundColor:"#E5E5E5"}}>
     <Header/>
    <div className="org-parent">
     
      <h2>Organization details</h2>
      <form onSubmit={handleSubmit} className="org-form">
        {error && <Alert variant="danger">{error}</Alert>}
        <strong>Logged in as:</strong> {currentUser.email}
        <div >
          <label htmlFor="company" >
            Company Name
          </label>
          <input
            type="text"
            placeholder="Company Name"
            
            id="company"
            ref={companyRef}
            required
          />
        </div>
        <div >
          <label htmlFor="address" >
            Address
          </label>
          <input
            type="text"
            placeholder="Address"
            
            id="address"
            ref={addressRef}
            required
          />
        </div>
        
        <div >
          <label htmlFor="GSTIN " >
            GSTIN
          </label>
          <input
            type="text"
            placeholder="GSTIN"
            
            id="person"
            ref={GSTRef}
            required
          />
          </div>

        <div >
          <label htmlFor="person " >
            Person of Contact
          </label>
          <input
            type="text"
            placeholder="Joe Dolla"
            
            id="person"
            ref={personRef}
            required
          />
        </div>
        <div >
          <label htmlFor="whatsappnumber" >
            Whatsapp Number
          </label>
          <input
            type="number"
            placeholder="Whatsapp Number"
            
            id="whatsappnumber"
            ref={whatsappnumberRef}
            required
          />
        </div>
        <div className="center">
        <button
          type="submit"
          className="sub-button"
          >
          Submit
        </button>
        <button
          className="sub-button"
          
          onClick={handleLogout}
        >
          Logout
        </button>
        </div>
      </form>
   
    </div>
    <Footer/>
    </div>
  );
}
