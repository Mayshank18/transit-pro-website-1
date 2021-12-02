import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignupPage from "./Components/SignupPage";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";
import { AuthProvider } from "./Contexts/AuthContext";
import OrganizationPage from "./Components/OrganizationPage";
import ProfileDashboard from "./Components/ProfileDashboard";
import LandingPage from "./Components/LandingPage"
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword";
import EditDetails from "./Components/EditDetails";
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
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute exact path="/landing" component={LandingPage}/>
            <PrivateRoute exact path="/profile" component={ProfileDashboard}/>
            <PrivateRoute exact path="/editdetails" component={EditDetails}/>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
