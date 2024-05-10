import { useState } from "react";
import axios from "axios";

/**
 * The `AuthPage` component renders the authentication page that includes both login and sign-up forms.
 * It allows the user to either log in with existing credentials or create a new account.
 * 
 * Props:
 * - onAuth: A function that is called with the user's information upon successful authentication or account creation.
 * 
 * State:
 * - username: Stores the username input by the user.
 * - secret: Stores the password input by the user.
 * - email: Stores the email input by the user during sign-up.
 * - first_name: Stores the first name input by the user during sign-up.
 * - last_name: Stores the last name input by the user during sign-up.
 * 
 * This component utilizes axios for making POST requests to either login or sign-up endpoints, handling the submission events for both forms.
 */
const AuthPage = (props) => {
  // State variables to store user inputs
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [email, setEmail] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();

  /**
   * Handles the login form submission.
   * Performs a POST request with the username and secret (password) to the login endpoint.
   * Upon successful response, calls the `onAuth` prop with the response data.
   * 
   * @param {Event} e The event triggered by form submission.
   */
  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post(`http://192.168.68.127:3001/login`, { username, secret })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  /**
   * Handles the sign-up form submission.
   * Performs a POST request with the username, secret (password), email, first name, and last name to the sign-up endpoint.
   * Upon successful response, calls the `onAuth` prop with the response data.
   * 
   * @param {Event} e The event triggered by form submission.
   */
  const onSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://192.168.68.127:3001/signup", {
        username,
        secret,
        email,
        first_name,
        last_name,
      })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  return (
    <div className="login-page">
      <div className="card">
        {/* Login Form */}
        <form onSubmit={onLogin}>
          <div className="title">Login</div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            onChange={(e) => setSecret(e.target.value)}
          />
          <button type="submit">LOG IN</button>
        </form>

        {/* Sign Up Form */}
        <form onSubmit={onSignup}>
          <div className="title">or Sign Up</div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            onChange={(e) => setSecret(e.target.value)}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <button type="submit">SIGN UP</button>
        </form>
      </div>

      <style>{`
  .login-page { 
    width: 100vw; 
    height: 100vh; 
    padding-top: 6vw; 
    background: linear-gradient(180deg, rgba(34,139,34,1) 7%, rgba(34,139,34,1) 17%, rgba(0,128,0,1) 29%, rgba(50,205,50,1) 44%, rgba(60,179,113,1) 66%, rgba(85,107,47,1) 83%, rgba(107,142,35,1) 96%, rgba(124,252,0,1) 100%); 
  }
  .card { 
    width: 280px; /* Increased width for better form spacing */
    position: relative; 
    left: calc(50vw - 140px); /* Adjusted for increased widths */
    text-align: center; 
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.2); /* Enhanced shadow for better depth */
    background: #f0f0f0; /* Lighter background for the form area */
    padding: 20px;
    margin-top: 20px; /* Added margin top for better position */
  }
  .title { 
    margin-bottom: 20px; /* Increased space below title */
    font-size: 24px; /* Slightly larger font size */
    color: #00563f; /* Dark green, kept for consistency */
    font-weight: 700; 
  }
  input { 
    width: calc(100% - 20px); /* Adjust input width for padding */
    margin-top: 12px; 
    padding: 10px; /* Slightly larger padding for better readability */
    background-color: #ffffff; 
    outline: none; 
    border: 2px solid #00563f; 
    border-radius: 4px; 
    color: #00563f; /* Text color changed for better visibility */
    font-size: 16px; /* Larger font size for readability */
  }
  button { 
    margin-top: 16px; 
    width: calc(100% - 20px); /* Button width adjusted for padding */
    padding: 10px; 
    background-color: #007849; /* Adjusted button color for better visibility */
    color: #ffffff; 
    border: none; 
    border-radius: 4px; 
    font-size: 16px; /* Increased font size for buttons */
    font-weight: 600; /* Bold font weight for button text */
  }
  button:hover {
    background-color: #00563f; /* Slightly darker green on hover for feedback */
  }
`}</style>
    </div>
  );
};

export default AuthPage;
