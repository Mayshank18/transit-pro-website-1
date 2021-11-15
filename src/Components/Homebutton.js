import { withRouter } from "react-router";
import "../Styling/login.css";
import "../App.css";
const Homebutton = withRouter(({ history }) => {
  return (
    <div>
      <div>
        <button
          onClick={() => history.push("/login")}
          className={["button-color","login-rectangle"]}
        >
          Login
        </button>
      </div>
      <div>
        <button onClick={() => history.push("/signup")}>Signup</button>
      </div>
    </div>
  );
});

export default Homebutton;
