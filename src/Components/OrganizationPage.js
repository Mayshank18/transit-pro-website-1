import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";

export default function OrganizationPage() {
  const companyRef = useRef();
  const phonenumberRef = useRef();
  const whatsappnumberRef = useRef();
  const addressRef = useRef();

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className="container">
      <h2>Organization details</h2>
      <form>
        {error && <Alert variant="danger">{error}</Alert>}
        <strong>Logged in as:</strong> {currentUser.email}
        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Company Name"
            className="form-control"
            id="company"
            ref={companyRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            placeholder="Address"
            className="form-control"
            id="address"
            ref={addressRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phonenumber" className="form-label">
            Phone Number
          </label>
          <input
            type="number"
            placeholder="Phone number"
            className="form-control"
            id="phonenumber"
            ref={phonenumberRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="whatsappnumber" className="form-label">
            Whatsapp Number
          </label>
          <input
            type="number"
            placeholder="Whatsapp Number"
            className="form-control"
            id="whatsappnumber"
            ref={whatsappnumberRef}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-success"
          //   disabled={loading}
        >
          Submit
        </button>{" "}
        &nbsp;&nbsp;&nbsp;
        <button
          type="submit"
          className="btn btn-sm btn-success"
          onClick={handleLogout}
        >
          Logout
        </button>
      </form>
    </div>
  );
}
