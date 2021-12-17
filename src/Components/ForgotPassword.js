import React from "react";
import { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { useAuth } from "../Contexts/AuthContext";
import Header from "./Header";
import "./ForgotPassword.css"
import Footer from "./Footer";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    let cancel = false;
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value).then(() => {
        if (cancel) return;
        setLoading(false);
      });
      alert("Check your mail inbox for further instructions");
      history.push("/login");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
    cancel = true;
    return cancel;
  }
  return (
    <div style={{backgroundColor:"#E5E5E5",height:"100vh"}}>
    <Header/>
    <div className="forgot-container">
    <div className="sign-parent">
      <h2>Reset your password.</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <form onSubmit={handleSubmit}className="sign-form">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            placeholder="enter your email id"
            className="form-control"
            id="email"
            ref={emailRef}
            required
          />
        </div>
        <button
          type="submit"
          className="sub-button"
         
        >
          Reset Password
        </button>
      </form>
    </div>
    </div>
    <Footer/>
    </div>
  );
}
