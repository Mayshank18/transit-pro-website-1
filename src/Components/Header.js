import React from 'react'
import "../Styling/header.css"
import logo from '../Photos/homepage.png'
export default function Header() {
    return (
        <div className="topnav"> 
        <img src={logo} className="logo"/>          
        </div>
    )
}
