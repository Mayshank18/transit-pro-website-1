import React, { useEffect, useState } from 'react'

import Navbar from './Navbar'
import { useAuth } from "../Contexts/AuthContext";
import {app, auth, db, storage} from "../firebase"
import "./LandingPage.css"
import { NavLink } from 'react-router-dom'
import Footer from './Footer'
import truck from "../images/truck2.png"
import loadgif from "../images/load.gif"
import Popup from './Popup';

import { getDownloadURL, listAll, ref, uploadBytesResumable } from '@firebase/storage';
import { Helmet } from 'react-helmet';
import { GrDownload } from 'react-icons/gr';

function LandingPage() {
  
    const { currentUser, logout } = useAuth();
        const [loading,setLoading]=useState(true);
        const [posts,setPosts]=useState([]);
        const [isOpen,setIsopen]=useState(false);
        const [progress,setProgress]=useState(0);
        const [uploadPc,setUploadPc]=useState("none");
        const [lastFile,setLastFile]=useState("none");
        const [userDetails,setUserDetails]=useState('');
        const [files_name,setFiles_name]=useState([]);
        const [files_url,setFiles_url]=useState([]);
    useEffect(() => {
        const getdatafromFirebase=[];
        const sub=db.collection("Org")
        .where("Email","==", currentUser.email)
        .get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                getdatafromFirebase.push({...doc.data(), key: doc.id});
                setUserDetails(doc.data());
            });
            setPosts(getdatafromFirebase);
            setLoading(false);
           
        });

        //return ()=>sub();
    }, [])

    function formHandler(e){
        e.preventDefault();
        const file=e.target[0].files[0];
     

        var fileInput = 
        document.getElementById('file1');
        var filePath = fileInput.value;

         // Allowing file type
         var allowedExtensions = 
         /(\.xlsx)$/i;
   
 if (!allowedExtensions.exec(filePath)) {
     alert('Please upload files only in .xlsx format');
   
 }
   else
   {
    // alert("file uploaded")
      
      fileHandler(file);
        setUploadPc("block");
        fetchFiles();
        setLastFile("block");
     
   }
    }
    
     const fileHandler = (file)=>{
          if(!file) return;
          const storageRef=ref(storage, `/files/${userDetails.Company}/${file.name}`)
            const uploadTask= uploadBytesResumable(storageRef,file);
            uploadTask.on("state_changed",(snapshot)=>{
                const prog= Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            setProgress(prog);
            },(err)=>console.log(err),
            ()=>{
                // getDownloadURL(uploadTask.snapshot.ref)
                // .then((url)=>console.log(url));
            }
            );
        
           
    };

    async function fetchFiles(){
        console.log("fetch")
        const listRef = ref(storage, `files/${userDetails.Company}`);

// Find all the prefixes and items.
listAll(listRef)
  .then((res) => {
   if(res)
   {
    
    res.items.forEach((itemRef) => {
    
    console.log("items from storage "+itemRef.name);

   setFiles_name (files_name.push(itemRef.name));
   console.log("ins "+files_name);
getDownloadURL(itemRef).then((url)=>{
    files_url.push(url);
   })
  
      
    });
}   //if res>0
else{

   
    console.log("No files present");
    
}
  }).catch((error) => {

    console.log("Error occured"+error);
  });
// console.log("names: "+files_name);
    }
 

    if (loading)
    {
        return(
            
        <div style={{backgroundColor:"#E5E5E5", alignItems:"center"}}>
        <Navbar/>
         
            <img src={loadgif} alt="loading" className="load-img"/>
            <Footer/>
            </div>
        )
    }


    return (

 
        <div style={{backgroundColor:"#E5E5E5"}}>
            <Helmet>
        <title>Transit Pro | Home</title>
      </Helmet>
     <Navbar/>

     <div id="row" style={{ height:"100vh"}}>
         <div className="column  col-left">
         <div className="miniProfile">

         {
                posts.length>0?
                (posts.map((post)=><div key={post.key}>
                    
                    <h2>{post.Company}</h2>
                    
                    
                    
                    </div>) ):
              <h2>Company pvt. Ltd.</h2>
            }

             
            <NavLink exact to="/profile" className="prof-link">View Profile</NavLink>
           <div className="member">
           <h5>Membership: Platinum</h5>
           </div>
         </div>
         
         </div>
         {/* middle Column */}
         <div className="column col-mid">
            <div className="reqBox">
                <img src={truck} alt="icon" className="reqtruck"/>
                <input type="text" className="reqinp" placeholder="Post Requirements"/>
            </div>
            <div className="liverfq">
                <h3> <span>LIVE</span> RFQs</h3>
                <div className="list-rfq">
                    <ul>
                        <li>No Live RFQ at the Moment</li>
                    </ul>
                </div>
            </div>
            <div className="feed">
                <h3>No live feed yet.</h3>
            </div>

         </div>

         {/* Right col */}
         <div className="column col-right ">
             <div className="util">
                 <h3>My Utilities</h3>
                 <button className="bt-util">RFQs</button>
                 
                 <button className="bt-util">My Analytics</button>
                 
                 <button className="bt-util">My Quotations</button>
             </div>
             <div className="data">
             <h3>My Data</h3>
             <button className="bt-util" onClick={()=>setIsopen(true)}>Per Kg</button>


             <Popup trigger={isOpen} setTrigger={setIsopen}>
               <form className="pop-form" onSubmit={formHandler}>
            <a className="dwnld-link sub-button" href="https://firebasestorage.googleapis.com/v0/b/transit-pro-fdf25.appspot.com/o/files%2FTransit%20template%2FTransit%20Template.xlsx?alt=media&token=e9911270-ad1c-4083-b947-536b82bf899c">Download Template</a>
                   
                 <input type="file" id="file1" style={{display:"block"}}/>
                    <button type="submit" className="sub-button" >Upload</button>
              
                </form>
                    <p style={{display: uploadPc}}>Uploaded {progress}%</p>

                <div style={{display: lastFile}}>
                    <p>last file uploaded</p>
                </div>
                        
                          
               
             </Popup>
             
                 
                 <button className="bt-util"onClick={()=>setIsopen(true)}>Per Tonne</button>
                 
                 <button className="bt-util">Favourite Lanes</button>
             </div>
         </div>
     </div>
     <Footer/>
     </div>
    )
}

export default LandingPage
