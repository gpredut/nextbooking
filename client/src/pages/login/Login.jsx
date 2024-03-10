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
      const res = await axios.post("https://nextbooking-client.vercel.app//api/auth/login", credentials); 
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        if (err.response.status === 405) {
          // The server doesn't allow the POST method for this endpoint
          dispatch({ type: "LOGIN_FAILURE", payload: { message: "Server error: Method Not Allowed." } });
        } else {
          // Other server errors
          dispatch({ type: "LOGIN_FAILURE", payload: { message: "Server error: " + err.response.data } });
        }
      } else if (err.request) {
        // The request was made but no response was received
        dispatch({ type: "LOGIN_FAILURE", payload: { message: "Network error: No response received from server." } });
      } else {
        // Something happened in setting up the request that triggered an error
        dispatch({ type: "LOGIN_FAILURE", payload: { message: "Request error: " + err.message } });
      }
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
