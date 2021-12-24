import React from 'react'
import "./header.css"
import logo from '../images/homepage.png'
import { useHistory } from 'react-router-dom'
export default function Header() {

    const history=useHistory();
    return (
    
        <div className="headParent">
        <div className="head">
            
        
            <img src={logo} className="logo" onClick={()=>{
                history.push("/");
                
            }}
            style={{cursor:"pointer"}}
            /> 
      
            </div>
            <div className='home'>
                <p className='home-p' onClick={()=>{
                    history.push("/");
                
                }}
                style={{cursor:"pointer"}}>Home</p>
            </div>
        </div>   
    )
}
