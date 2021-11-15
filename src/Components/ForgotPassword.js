import React from "react";
import { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { useAuth } from "../Contexts/AuthContext";
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
      setMessage("Check your inbox for further instructions");
      history.push("/login");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
    cancel = true;
    return cancel;
  }
  return (
    <div className="container">
      <h2>Password Reset</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <form onSubmit={handleSubmit}>
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
          className="btn btn-sm btn-success"
          disabled={loading}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
