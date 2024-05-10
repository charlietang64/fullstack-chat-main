import { useState } from "react";

import Chats from "./chat"
import UserList from "./userList";
import Login from "./login";

/**
 * The App component serves as the main entry point of the application.
 * It manages the authentication state of the user and decides which page to display based on whether a user is authenticated.
 * 
 * @returns {JSX.Element} The rendered component. If the user is not authenticated, it renders the AuthPage component,
 * allowing the user to authenticate. Once authenticated, it renders the ChatsPage component, passing the authenticated user data.
 */
function App() {
  // State to keep track of the user's authentication status
  const [user, setUser] = useState();

  // Function to handle authentication
  const handleAuth = (userData) => {
    setUser(userData);
  };

  // Conditional rendering based on the user's authentication status
  if (!user) {
    // If no user is authenticated, render the authentication page
    return <Login onAuth={handleAuth} />;
  }
  else if(user.username === "admin") {
    return <UserList />
  }
  else {
    // If a user is authenticated, render the chat page
    return <Chats user={user} />;
  }
}

export default App;
