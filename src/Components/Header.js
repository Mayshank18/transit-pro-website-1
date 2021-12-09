import React from 'react'
import "./header.css"
import logo from '../images/homepage.png'
import { useHistory } from 'react-router-dom'
export default function Header() {

    const history=useHistory();
    return (
    
        <div className="navParent">
        <div className="navigation">
            
        
            <img src={logo} className="logo" onClick={()=>{
                history.push("/");
                
            }}
            style={{cursor:"pointer"}}
            />    
         
               
    
      
            </div>
        </div>   
    )
}
