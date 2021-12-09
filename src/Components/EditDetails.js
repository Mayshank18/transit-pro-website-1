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
 
  
  const phoneRef= useRef();
 
  const addressRef = useRef();

  const personRef=useRef();
  const [error, setError] = useState("");
  const wapRef=useRef();
  const compRef=useRef();
  const revRef=useRef();
  const truRef=useRef();
  const sect=useRef();
  const serv=useRef();
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [invalidGst,setInvalidGst]=useState(true);
  const [dispWhatsapp,setdispWhatsapp]=useState("none");
  const [isChecked, setIsChecked] = useState(true);
  const [loading,setLoading]=useState(true);
  const [posts,setPosts]=useState([]);
  const [others,setOthers]=useState("none");




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
    console.log("submitted "+addressRef.current.value+" "+phoneRef.current.value+" "+personRef.current.value);
   

    
    
   
    var docRef = db.collection("Org").doc(currentUser.email);

   
      return docRef.update({
        
       
        Address: addressRef.current.value,
       
         Person:personRef.current.value,
     Phone:phoneRef.current.value,
     Exp_Companies:compRef.current.value,
     Revenue:revRef.current.value,
     Sector:sect.current.value,
     Service:serv.current.value,
     Trucks:truRef.current.value
     
        
      })
      .then(() => {
        alert("Your details have been submitted👍");
        history.push("/landing");
      
      })
      .catch((error) => {
        alert(error.message);
        
      });
   
    
 //else
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
          <label  >
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
        {/* wap */}
        <div >
          <label >
         Whatsapp Number
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
         ref={wapRef}
            required               
                          
            defaultValue= {post.Whatsapp}/> 
            {/* c2 */}
           

            </div>) ):
               <input type="text" placeholder="9123555091" />
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
        {/* companies */}
        <div >
          <label >
           Companies Associated
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
         ref={compRef}
            required               
                          
            defaultValue= {post.Exp_Companies}/> 
            {/* c2 */}
           

            </div>) ):
               <input type="text" placeholder="TATA,JSW" />
            }
           <div className="icon-edit" ><GrEdit /></div>
        </div>
        </div>
        {/* Trucks */}
        <div >
          <label >
          Vehicles
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
         ref={truRef}
            required               
                          
            defaultValue= {post.Trucks}/> 
            {/* c2 */}
           

            </div>) ):
               <input type="text" placeholder="Person" />
            }
           <div className="icon-edit" ><GrEdit /></div>
        </div>
        </div>
        {/* Revenue */}
        <div>
          <label>
            Revenue:
          </label>
          {
                posts.length>0?
                (posts.map((post)=> 
                
          <select
          className="rev-select"
          defaultValue={post.Revenue}
          ref={revRef}>
              <option value="">Choose..</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3+">3+</option>
              </select>)):""
}

              
        </div>
    
           {/* sect,serv */}
           <div>
            <label >Primary Sector</label>
            {
                posts.length>0?
                (posts.map((post)=> 
                
            <select
          className="rev-select"
          onChange={otherSpecify}
          defaultValue={post.Sector}
          ref={sect} >
                <option value="">Choose..</option>
              <option value="FMCG">FMCG</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Others">Others</option>
               </select>)):""
}
               
              <input type="text" 
                  placeholder="Please Specify"
                  ref={sect}
                  style={{display:others}}
             />
             
           
        </div>
        <div>
            <label > Service Type</label>
            {
                posts.length>0?
                (posts.map((post)=> 
                
            <select
            
          className="rev-select"
              defaultValue={post.Service}
          ref={serv}>
                <option value="">Choose..</option>
              <option value="FTL">FTL</option>
              <option value="PTL">PTL</option>
              <option value="FTL/PTL">Both</option>
              </select>)):""
}
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
