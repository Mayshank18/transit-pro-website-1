import React from "react";
import Homebutton from "./Homebutton";
import Header from "./Header";
import Footer from "./Footer"
import "../App.css"

export default function HomePage() {
  return (
    <div>
      <div>
      <Header/>  
      </div>
      <div className='button'>
        <Homebutton/>
      </div>
      <div>
      <Footer/>
      </div>
      
    </div>
  );
}
