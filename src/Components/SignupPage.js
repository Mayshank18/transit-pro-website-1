import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function SignupPage() {
  const emailRef = useRef();
  const contactRef = useRef();
  const newpasswordRef = useRef();
  const confirmpasswordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (newpasswordRef.current.value !== confirmpasswordRef.current.value) {
      return setError("Passwords do not match");
    }
    let cancel = false;
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, confirmpasswordRef.current.value).then(()=>{
        if (cancel) return;
      setLoading(false);
      })
      history.push("/login");
    } catch (err) {
      setError(err.message);
    }
    cancel=true;
    return cancel;

    // setLoading(false);
  }

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">
            Contact Number
          </label>
          <input
            type="number"
            placeholder="phone number"
            className="form-control"
            id="contact"
            ref={contactRef}
            required
          />
        </div>
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
          <label htmlFor="newpassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            placeholder="password"
            className="form-control"
            id="newpassword"
            ref={newpasswordRef}
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
            ref={confirmpasswordRef}
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
