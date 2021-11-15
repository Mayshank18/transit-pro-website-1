import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import global from "./global";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  
  const [contact, setContact] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (newpassword !== confirmpassword) {
      return setError("Passwords do not match");
    }
    let cancel = false;
    try {
      setError("");
      setLoading(true);
      await signup(email, confirmpassword).then(() => {
        if (cancel) return;
        setLoading(false);
      });
      history.push("/login");
    } 
    catch (err) {
      setError(err.message);
      setLoading(false);
    }
    cancel = true;
    console.log(email, contact);

    
    db.collection("Org")
    .doc(email)  
    .set({
        Email: email,
        GSTINArr: [],
         Company: "",
      Phone: contact,
      Person:"",
      Whatsapp: "",
      Address: "",
   
      })
      .then(() => {
        setLoading(false);
        console.log("Your message has been submitted👍");
        // setContact("");
        // setEmail("");
        // setNewpassword("");
        // setConfirmPassword("");
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
        setContact("");
        setEmail("");
        setNewpassword("");
        setConfirmPassword("");
      });


    return cancel;
  }

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            placeholder="someone@organization.com"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            //ref={emailRef}
            required
          />
        </div>
        
       

        <div className="mb-3">
          <label htmlFor="contact" className="form-label">
            Contact Number
          </label>
          <input
            type="number"
            placeholder="phone number"
            className="form-control"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            //ref={contactRef}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="newpassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            placeholder="password"
            className="form-control"
            id="newpassword"
            //ref={newpasswordRef}
            value={newpassword}
            onChange={(e) => setNewpassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="password"
            className="form-control"
            id="confirmpassword"
            //ref={confirmpasswordRef}
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-success"
          disabled={loading}
        >
          Signup
        </button>
      </form>
    </div>
  );
}
