import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { db } from "../firebase";
import "./OrganizationPage.css"
import "./EditDetails.css"
import Header from "./Header";
import Footer from "./Footer";
import { Checkbox } from "react-bootstrap";
import { GrEdit } from "react-icons/gr";
import { Helmet } from "react-helmet";


const GSTDict={
  "35":"Andaman and Nicobar Islands" ,
  "28":"Andhra Pradesh"  ,
  "37":"Andhra Pradesh" ,
  "12":"Arunachal Pradesh",
  "18": "Assam",
    "Bihar": "10",
    '04': "Chandigarh", 
     "22": " Chattisgarh",
    "26" :"Dadra and Nagar Haveli",
     "25" :"Daman and Diu",
    "07":"Delhi" ,
 "30":"Goa" ,
 "24":"Gujarat", 
 "06": "Haryana"  ,
  "02":"Himachal Pradesh" ,
  "01":"Jammu and Kashmir" ,
   "20":"Jharkhand" ,
 "29":"Karnataka",
 "32": "Kerala"  ,
  "31":"Lakshadweep Islands" ,
   "23":"Madhya Pradesh" ,
   "27": "Maharashtra" ,
   "14": "Manipur" ,
   "17":"Meghalaya" ,
   "15":"Mizoram" ,
   "13":"Nagaland" ,
   "21":"Odisha"  ,
   "34":"Pondicherry" ,
   "03":"Punjab"  ,
   "08": "Rajasthan" ,
    "11":"Sikkim" ,
    "33":"Tamil Nadu" ,
    "36":"Telangana"  ,
    "16":"Tripura" ,
    "09":"Uttar Pradesh" ,
    "05": "Uttarakhand" ,
    "19": "West Bengal" ,
}
const codes=Object.keys(GSTDict);

export default function EditDetails() {
  const companyRef = useRef();
  
  const phoneRef= useRef();
  const whatsappnumberRef = useRef();
  const addressRef = useRef();
  const GSTRef = useRef();
  const personRef=useRef();
  const [error, setError] = useState("");
  const [stateValue,setStatevalue]=useState("");
  const [Gst,setGst]=useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [invalidGst,setInvalidGst]=useState(true);
  const [dispWhatsapp,setdispWhatsapp]=useState("none");
  const [isChecked, setIsChecked] = useState(true);
  const [loading,setLoading]=useState(true);
  const [posts,setPosts]=useState([]);



  useEffect(() => {
    const getdatafromFirebase=[];
    const sub=db.collection("Org")
    .where("Email","==", currentUser.email)
    .get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            getdatafromFirebase.push({...doc.data(), key: doc.id});
            console.log(doc);
        });
        setPosts(getdatafromFirebase);
        setLoading(false);
        console.log("Inside Edit details: "+getdatafromFirebase);
        // setUser(getdatafromFirebase);
      
    });

    //return ()=>sub();
}, [])
let inpname,inpvalue
//load from db


async function handleSubmit(e){
    e.preventDefault();
    console.log("submitted "+addressRef.current.value+" "+GSTRef.current.value+" "+companyRef.current.value);
    validateCode();
    console.log(companyRef.current.value+" "+phoneRef+" "+addressRef);
    if(invalidGst){
      setError("Please provide valid Gst");
    }
    
    else{
    var docRef = db.collection("Org").doc(currentUser.email);

   
      return docRef.update({
        
       
        Address: addressRef.current.value,
       
         Person:personRef.current.value,
     Phone:phoneRef.current.value
     
        
      })
      .then(() => {
        alert("Your details have been submitted👍");
        history.push("/landing");
      
      })
      .catch((error) => {
        alert(error.message);
        
      });
   
    
 }//else
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
  function validateCode(){
    //console.log(Gst);
   
    if(Gst.length==15 && Gst.charAt(13)=="Z")
    {
      //check state
      var state=Gst.substring(0,2);
      if(state in GSTDict){
        setStatevalue(GSTDict[state]);
        console.log(" valid Gst");
        setInvalidGst(false);
      }
      else{
        console.log("invalid state");
        setStatevalue("Invalid State code");
      }
     
      //valid length and checksum
    }
    else{
      //invalid length or Z missing
      console.log("invalid length");
      setStatevalue("Invalid GST");
      
    }
  }
  function handleCheck(){
    setIsChecked(!isChecked);
    if(isChecked)
    {
      setdispWhatsapp("block");
    }
    else{
      setdispWhatsapp("none");
    }
  }


  return (
    <div style={{backgroundColor:"#E5E5E5"}}>
      <Helmet>
        <title>Transit Pro | Edit Details</title>
      </Helmet>
     <Header/>
    <div className="org-parent">
     
      <h2>Edit details</h2>
      <form onSubmit={handleSubmit} noValidate className="org-form edit-form">
        {error && <Alert variant="danger">{error}</Alert>}
     
        
        {
                posts.length>0?
                (posts.map((post)=>  <p><strong>Logged in as: </strong>
                    {post.Company}
                  </p>) ):
              <p> <strong>Logged in as: </strong>{currentUser.email}</p>
            }

        <div >
          <label htmlFor="address" >
            Address
          </label>
          <div className="fieldGrid">
            {
                posts.length>0?
                (posts.map((post)=>  <div>
                <input
            type="text"
            placeholder="Address"
           
            id="add1"
          ref={addressRef}
            required               
            // style={{display: af1}}               
            defaultValue= {post.Address}/> 
            

            </div>) ):
               <input type="text" placeholder="Address" />
            }
           <div className="icon-edit" ><GrEdit /></div>
        </div>
         
          
        </div>
        
        <div >
          <label htmlFor="address" >
            Phone
          </label>
          <div className="fieldGrid">
            {
                posts.length>0?
                (posts.map((post)=>  <div>
                <input
            type="text"
            placeholder="Phone"
           
            id="add1"
          ref={phoneRef}
            required               
            // style={{display: af1}}               
            defaultValue= {post.Phone}/> 
            

            </div>) ):
               <input type="text" placeholder="Phone" />
            }
           <div className="icon-edit" ><GrEdit /></div>
        </div>
         
          
        </div>
        

        <div >
          <label >
            Person of Contact
          </label>

          <div className="fieldGrid">
            {
                posts.length>0?
                (posts.map((post)=>  
                <div>
                <input
            type="text"
            placeholder="Joan"
           
            id="person1"
         ref={personRef}
            required               
                          
            defaultValue= {post.Person}/> 
            {/* c2 */}
           

            </div>) ):
               <input type="text" placeholder="Person" />
            }
           <div className="icon-edit" ><GrEdit /></div>
        </div>


         
        
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
