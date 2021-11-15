import React, { useState, useRef } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    let cancel = false;
    try {
      
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value).then(()=>{
        if (cancel) return;
      setLoading(false);
      })
      history.push("/organization");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
    cancel=true;
    return cancel;
   
  }

  return (
    <div className="container">
      <h2>LOGIN</h2>
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
            ref={emailRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            className="form-control"
            id="password"
            ref={passwordRef}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-success"
          disabled={loading}
        >
          Login
        </button>
      </form>
      <div>
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
      <div>
        <Link to="/signup">Need an account</Link>
      </div>
    </div>
  );
}
