import React from "react";
import emailjs from 'emailjs-com'
import Header from "./Header";
import Footer from "./Footer"
import "../App.css"
import "./HomePage.css"
import Hero from "../images/white.png"
import truck from "../images/truck.png"
import { useState } from "react";
export default function HomePage() {
    const [result,setResult]=useState(false);
    const sendEmail=(e)=>{
        e.preventDefault();
        emailjs.sendForm('service_haxbxbn',
        'template_96qzk8a',
        e.target,
        'user_69DDl1S4TLSuI5oZM5zNS'
        ).then(res=>{
            console.log(res)
        }).catch(err=>{console.log(err)});
        e.target.reset();
        setResult(true);
    }
  return (
    <>
      
      <Header/>
      <div className="container">
          <div className="row">
              <div className="col-1">
                  <h1>Businesses Grow With</h1>
                  <div className="banner-img">
                      <img src={Hero} alt=""/>
                  </div>
                  
                  <p>This is the platform where your Logistic Companies find their Future Business.</p>
                    <div className="LoginSignup">
                        <a href="/login/" className="btn">LogIn</a>
                        <a href="/signup/" className="btn">SignUp</a>
                    </div>
                  <div><img src={truck} alt=""/></div>
              </div>
              <div className="col-2">
                  <h3>CONTACT US</h3>

                  <form onSubmit={sendEmail}>
                      <div className="login">
                          
                          <input type="text" name="name" className="input" placeholder="Your Name" maxlength="200" required/>
                          <input type="text" name="email_from" className="input" placeholder="Your Email Address" maxlength="254" required/>
                      </div>

                      <div className="subject">
                          
                          <input type="tel" name="phoneNo" className="input" placeholder="Mobile Number" maxlength="128" required/>
                      </div>

                      <div className="msg">
                          
                          <textarea name="message" cols="40" rows="10" className="area" placeholder="Leave a Message" required></textarea>
                      </div>
                      <input type="submit" className="btn" value="Send Message"/>
                      <div className="successMessage"> {result?"Message sent successfully!We will contact you soon.":null }</div>
                  </form>
              </div>
          </div>
      </div>  
      
      <Footer/>
     
      
    </>
  );
}





