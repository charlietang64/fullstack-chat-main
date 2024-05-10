import { useState } from "react";
import axios from "axios";
import LoginPage from "./login";

const SignupPage = (props) => {
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [email, setEmail] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [showLogin, setLogin] = useState(false);

  const onSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/signup", {
        username,
        secret,
        email,
        first_name,
        last_name,
      }, {
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

    // Function to toggle the showLogin state
    const toggleLogin = () => {
        setLogin(!showLogin);
    };

    if (showLogin) {
        // Display the SignupPage component if showSignUp is true
        return <LoginPage {...props} />;
    }


  return (
    <div className="login-page">
    <div className="card">
      <form onSubmit={onSignup}>
        <div className="title">Sign Up</div>
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
        <button id="submit" type="submit">SIGN UP</button>
      </form>
      <div>
          Already have an account?{" "}
          <button onClick={toggleLogin} className="sign-up-button" style={{ background: "none", border: "none", textDecoration: "underline", cursor: "pointer", color: "#00563f", fontSize: "16px" }}>
            Login
          </button>
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
  #submit { 
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

  .sign-up-button {
    background: none;
    border: none;
    text-decoration: underline;
    cursor: pointer;
    color: #00563f;
    font-size: 16px;
  }

  .sign-up-button:hover {
    background-color: rgba(0, 86, 63, 0.1); /* Lighter green on hover */
  }
`}</style>
    </div>
    </div>
  );
};

export default SignupPage;