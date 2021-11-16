import { withRouter } from "react-router";
import "../Styling/homebutton.css";
import "../App.css";
const Homebutton = withRouter(({ history }) => {
  return (
    <div>
      <div>
        <button
          onClick={() => history.push("/login")}
          className="button-color login-rectangle login-font"
        >
          Login
        </button>
      </div>
      <div>
        <button onClick={() => history.push("/signup")} className="button-color signup-rectangle signup-font">Signup</button>
      </div>
    </div>
  );
});

export default Homebutton;
