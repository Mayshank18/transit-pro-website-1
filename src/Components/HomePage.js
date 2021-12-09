import React from "react";
import emailjs from "emailjs-com"
import Homebutton from "./Homebutton";
import Header from "./Header";
import Footer from "./Footer"
import "../App.css"
import "./HomePage.css"
import Hero from "../images/hero.PNG"
import truck from "../images/truck.png"
import { Helmet } from "react-helmet";
import { useRef } from "react";
export default function HomePage() {

  const emailRef=useRef();
  const nameRef=useRef();
  const queryRef=useRef();
  function sendEmail(e){
    e.preventDefault();

    emailjs.send("service_tnyby6u","template_gl3mqfy",{
      name: nameRef.current.value,
      user_email: emailRef.current.value,
      query: queryRef.current.value,
      },'user_GLD89axVW2xbsmYDgI3JY') 
      .then(res=>{
        console.log(res);
      }).catch(err=>console.log("Error: "+err));

     //emailjs.send("service_tnyby6u","template_gl3mqfy",e.target,'user_GLD89axVW2xbsmYDgI3JY');
    
      alert("Query submitted successfully");

  }

  return (
    <>
      <Helmet>
        <title>Transit Pro</title>
      </Helmet>
      <Header/>  
      <div className="divide">
      <div className='Heroleft'>
        <h1 className="hero-H">Businesses grow with</h1>
    <img src={Hero} alt="Transit Pro" className="banner" />
    <p>This is a platform where your Logistic Companies finds their Future Businesses. </p>
        <Homebutton/>
        
        <img src={truck} alt="Truck" className="truck-gr"/>
      </div>
      {/* Left element */}
      <div className="rightParent">
      <div className="HeroRight">

        <h1>Contact Us</h1>
        <form onSubmit={sendEmail}>
        <label >
      Name
    </label>
    <input type="text" ref={nameRef} placeholder="Joe Mason"/>
    <label >
      Email
    </label>
    <input type="text" ref={emailRef} placeholder="joe@transitpro.com"/>

    <label >Query</label>
   <textarea name="Message" name="query" ref={queryRef}/>

      <button type="submit">Submit</button>
        </form>

      </div>
      </div>
      </div>
      
      <Footer/>
     
      
    </>
  );
}
