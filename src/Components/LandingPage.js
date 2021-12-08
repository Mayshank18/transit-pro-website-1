import React, { useEffect, useRef, useState } from 'react'

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
import { GrDownload, GrRefresh } from 'react-icons/gr';
import { FaFileDownload } from 'react-icons/fa';
import {  GoArrowRight } from 'react-icons/go';

function LandingPage() {
  
    const { currentUser, logout } = useAuth();
        const [loading,setLoading]=useState(true);
        const [posts,setPosts]=useState([]);
        const [isOpenKg,setIsopenKg]=useState(false);
        const [isOpenTonne,setIsopenTonne]=useState(false);
        const [progress,setProgress]=useState(0);
        const [uploadPc,setUploadPc]=useState("none");
        const [lastFileKg,setLastFileKg]=useState("");
        const [lastFileUrlKg,setLastFileUrlKg]=useState("");
        const [lastFileTn,setLastFileTn]=useState("");
        const [lastFileUrlTn,setLastFileUrlTn]=useState("");
        const [userDetails,setUserDetails]=useState('');

        const files_name=[];
        const files_url=[];
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

                fetchFilesKg();
               fetchFilesTonne();
               
             
           
        });
            //set last files
         

        //return ()=>sub();
    }, [])


    //kg start
    function formHandlerKg(e){
        e.preventDefault();
        const file=e.target[0].files[0];
     

        var fileInput = 
        document.getElementById('file-inp');
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
      
      fileHandlerKg(file);
        setUploadPc("block");
        // fetchFiles();
  
     
   }
    }
    
     const fileHandlerKg = (file)=>{
          if(!file) return;


         // Math.round(new Date().getTime()/1000)
         const d=new Date();
         
         var time=d.getTime();
         var day=d.getDate();
         var month=d.getMonth();
         var yr=d.getFullYear();
         const filetime=time+""+day+""+month+""+yr;
        
         console.log(filetime);
          const storageRef=ref(storage, `/files/${userDetails.Company}/perKg/${filetime}`)
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

     function fetchFilesKg(){
        console.log("fetch kg")
        const listRef = ref(storage, `files/${userDetails.Company}/perKg`);

// Find all the prefixes and items.
listAll(listRef)
  .then((res) => {
   if(res)
   {
    var f=0;
    res.items.forEach((itemRef) => {
        // if (f===0) {
            
       
    
    console.log("items from storage "+itemRef.name);
   
   setLastFileKg(itemRef.name);
     //console.log("last file "+lastFile);


   //console.log("ins "+files_name);
getDownloadURL(itemRef).then((url)=>{
   setLastFileUrlKg(url);
   })
  
    //   f=1;
    // }
}
    );
}   //if res>0
else{

   
    console.log("No files present");
    
}
  }).catch((error) => {

    console.log("Error occured"+error);
  });

    }
    
    //kg End

    //Tonne Start
    function formHandlerTonne(e){
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
      
      fileHandlerTonne(file);
        setUploadPc("block");
        // fetchFiles();
  
     
   }
    }
    
     const fileHandlerTonne = (file)=>{
          if(!file) return;


         // Math.round(new Date().getTime()/1000)
         const d=new Date();
         
         var time=d.getTime();
         var day=d.getDate();
         var month=d.getMonth();
         var yr=d.getFullYear();
         const filetime=time+""+day+""+month+""+yr;
        
         console.log(filetime);
          const storageRef=ref(storage, `/files/${userDetails.Company}/perTonne/${filetime}`)
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

     function fetchFilesTonne(){
        console.log("fetch Tn")
        const listRef = ref(storage, `files/${userDetails.Company}/perTonne`);

// Find all the prefixes and items.
listAll(listRef)
  .then((res) => {
   if(res)
   {
    var f=0;
    res.items.forEach((itemRef) => {
        // if (f===0) {
            
       
    
    console.log("items from storage "+itemRef.name);
   
   setLastFileTn(itemRef.name);
     //console.log("last file "+lastFile);


   //console.log("ins "+files_name);
getDownloadURL(itemRef).then((url)=>{
   setLastFileUrlTn(url);
   })
  
    //   f=1;
    // }
}
    );
}   //if res>0
else{

   
    console.log("No files present");
    
}
  }).catch((error) => {

    console.log("Error occured"+error);
  });

    }

    //Tonne End
 

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
             {/* Util */}
             <div className="util">
                 <h3>My Utilities</h3>
                 <button className="bt-util">RFQs</button>
                 
                 <button className="bt-util">My Analytics</button>
                 
                 <button className="bt-util">My Quotations</button>
             </div>

             {/* Data */}
             <div className="data">
             <h3>My Data</h3>
             <button className="bt-util" onClick={()=>setIsopenKg(true)}>Per Kg</button>


             <Popup trigger={isOpenKg} setTrigger={setIsopenKg}>
               <h2>My Data Per Kg</h2>
               <form className="pop-form" onSubmit={formHandlerKg}>
                   <div id="row-pop">
            <a className="sub-btn" href="https://firebasestorage.googleapis.com/v0/b/transit-pro-fdf25.appspot.com/o/files%2FTransit%20template%2FTransit%20TemplateKg.xlsx?alt=media&token=fa2f1606-6ede-49d9-b585-23f3647486a8">Download Template</a>
                   <div id="row-pop"><GoArrowRight className="ico-pop"/>
                 <input type="file" id="file-inp" style={{display:"block"}}/>
                 <GoArrowRight className="ico-pop"/>
                 </div>
                    <button type="submit" className="sub-btn " >Upload</button>
                    </div>
                </form>
                    <p style={{display: uploadPc}}>Uploaded {progress}%</p>
                  
                  
                      
                  
                <div >
                    <h5>Last Uploaded File</h5>
                    <button onClick={(e)=>{fetchFilesKg();
                    e.preventDefault();
                    } }className="sub-btn btn-rfrsh" type="button"><GrRefresh/></button>
                    {
                        (lastFileKg=="")?
                        <span href={lastFileUrlKg} className="last-upld">File Not Found<FaFileDownload className="ico-dwnld"/></span>
                        :<a href={lastFileUrlKg} className="last-upld">Download File: {lastFileKg}<FaFileDownload className="ico-dwnld"/></a>
                    }
                        
                  
                  
                </div>

                          
               
             </Popup>
             
                 
                 <button className="bt-util"onClick={()=>setIsopenTonne(true)}>Per Tonne</button>

                 <Popup trigger={isOpenTonne} setTrigger={setIsopenTonne}>
                     <h2>My Data Per Tonne</h2>
                     <form className="pop-form" onSubmit={formHandlerTonne}>
                   <div id="row-pop">
            <a className="sub-btn" href="https://firebasestorage.googleapis.com/v0/b/transit-pro-fdf25.appspot.com/o/files%2FTransit%20template%2FTransit%20TemplateTonne.xlsx?alt=media&token=1f02e492-4400-49ca-ad5d-b53789e6edd8">Download Template</a>
                   <div id="row-pop"><GoArrowRight className="ico-pop"/>
                 <input type="file" id="file-inp" style={{display:"block"}}/>
                 <GoArrowRight className="ico-pop"/>
                 </div>
                    <button type="submit" className="sub-btn " >Upload</button>
                    </div>
                </form>
                    <p style={{display: uploadPc}}>Uploaded {progress}%</p>
                  
         
                <div >
                    <h5>Last Uploaded File</h5>
                    <button onClick={(e)=>{fetchFilesTonne();
                    e.preventDefault();
                    } }className="sub-btn btn-rfrsh" type="button"><GrRefresh/></button>
                            {
                        (lastFileTn=="")?
                        <span href={lastFileUrlTn} className="last-upld">File Not Found<FaFileDownload className="ico-dwnld"/></span>
                        :<a href={lastFileUrlTn} className="last-upld">Download File: {lastFileTn}<FaFileDownload className="ico-dwnld"/></a>
                    }
                  
                </div>
                        
                          
               
             </Popup>
             {/* per tonne href=" */}
                 
                 <button className="bt-util">Favourite Lanes</button>
             </div>
         </div>
     </div>
     <Footer/>
     </div>
    )
}

export default LandingPage
