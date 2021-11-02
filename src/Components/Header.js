import { withRouter } from "react-router";

const Header = withRouter(({ history }) => {
  return (
    <div>
      <button onClick={() => history.push("/login")}>Login</button>
      <button onClick={() => history.push("/signup")}>Signup</button>
    </div>
  );
});

export default Header;
