import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      // Check if username or password is empty
      dispatch({ type: "LOGIN_FAILURE", payload: { message: "Please enter both username and password." } });
      return;
    }
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      // Display a generic error message for login failures
      dispatch({ type: "LOGIN_FAILURE", payload: { message: "Login failed. Please check your credentials and try again." } });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={credentials.username}
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <span className="error">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
