import React from "react";
import Homebutton from "./Homebutton";
import Header from "./Header";
import Footer from "./Footer"
import "../App.css"
import "./HomePage.css"
import Hero from "../images/hero.PNG"
import truck from "../images/truck.png"
import { Helmet } from "react-helmet";
export default function HomePage() {
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
        <form onSubmit="">
    <label htmlFor="email">
      Email
    </label>
    <input type="text" placeholder="joe@transitpro.com"/>

    <label htmlFor="query">Query</label>
   <textarea name="Message"/>

      <button type="submit">Submit</button>
        </form>

      </div>
      </div>
      </div>
      
      <Footer/>
     
      
    </>
  );
}
