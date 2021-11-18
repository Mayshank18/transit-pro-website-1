import React, { useEffect, useState } from 'react'
import { useAuth } from "../Contexts/AuthContext";
import {auth, db} from "../firebase"
import global from './global';
import { useHistory } from "react-router-dom";
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';

function ProfileDashboard() {
 
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
        const [loading,setLoading]=useState(true);
        const [posts,setPosts]=useState([]);
        const history = useHistory();

        useEffect(() => {
            const getdatafromFirebase=[];
            const sub=db.collection("Org")
            .where("Email","==", currentUser.email)
            .get()
            .then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    getdatafromFirebase.push({...doc.data(), key: doc.id});
                });
                setPosts(getdatafromFirebase);
                setLoading(false);
                console.log(getdatafromFirebase);
            });

            //return ()=>sub();
        }, [])
        
        if (loading)
        {
            return(
                <h1>loading data from firestore.. </h1>
            )
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
  


    return (
        <>
    <Navbar/>
            <h1>This is profile dashboard.</h1>
            {
                posts.length>0?
                (posts.map((post)=><div key={post.key}>
                    
                    <h2>{post.Company}</h2>
                    <h4>{post.Address}</h4>
                    <h4>{post.Person}</h4>
                    <h4>{post.INState}</h4>
                    <h4>{post.GSTINArr}</h4>
                    <h4>{post.Email}</h4>
                    <h4>{post.Phone}</h4>
                    <h4>{post.Whatsapp}</h4>
                    
                    
                    </div>) ):
                <h1>No details yet.</h1>
            }
                {/* <button className="btn btn-sm btn-success"   onClick={handleLogout}  >
          Logout
        </button> */}
            
        </>
    )
}

export default ProfileDashboard
