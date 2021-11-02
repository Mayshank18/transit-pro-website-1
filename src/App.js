import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignupPage from "./Components/SignupPage";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";
import { AuthProvider } from "./Contexts/AuthContext";
import OrganizationPage from "./Components/OrganizationPage";
import PrivateRoute from "./Components/PrivateRoute";

function App() {


  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/signup">
              <SignupPage />
            </Route>
            <PrivateRoute exact path="/organization" component={OrganizationPage}/>
            {/* <Route exact path="/organization">
              <OrganizationPage />
            </Route> */}
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
