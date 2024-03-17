import React, { useState } from "react";
import './chatstyles.css';
import { PrettyChatWindow } from "react-chat-engine-pretty";
import CommunityPage from "./CommunityPage"; // Import the CommunityPage component

/**
 * The `ChatsPage` component renders a chat interface using `PrettyChatWindow` from `react-chat-engine-pretty`,
 * and optionally, a `CommunityPage` component based on the user's interaction.
 * 
 * This component demonstrates a simple conditional rendering pattern based on the `showCommunity` state.
 * When `showCommunity` is true, the `CommunityPage` is rendered; otherwise, the chat interface is shown.
 * 
 * Props:
 * - user: An object containing user information. This prop is used to pass the user's details
 *   to the chat engine and the `CommunityPage` component.
 * 
 * State:
 * - showCommunity: A boolean state that controls the visibility of the `CommunityPage`. It is false by default,
 *   indicating that the chat window is displayed initially.
 * 
 * Handlers:
 * - handleIconClick: A function that sets `showCommunity` to true, which switches the display from the chat interface
 *   to the `CommunityPage`.
 */
const ChatsPage = (props) => {
  const [showCommunity, setShowCommunity] = useState(false); // State to control the display of CommunityPage

  const handleIconClick = () => {
    setShowCommunity(true); // Update the state to show CommunityPage
  };

  if (showCommunity) {
    return <CommunityPage user={props.user} />; // Render CommunityPage if showCommunity is true
  }

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <span
        role="img"
        aria-label="house"
        className="anticon anticon-house ce-custom-header-icon"
        style={{
          marginLeft: "12px",
          paddingTop: "calc(35.5px)",
          cursor: "pointer",
          color: "rgb(255, 255, 255)",
          transition: "all 0.66s ease 0s",
          position: "absolute",
          left: "33%",
          transform: "translateX(-50%)",
          margin: 0,
          zIndex: 10,
        }}
        onClick={handleIconClick} // Set the click handler
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={{
            position: "absolute",
            top: "31px",
            left: "33%",
            transform: "translateX(-50%)",
            margin: 0,
            zIndex: 10,
          }}
          focusable="false"
          data-icon="house"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z" />
        </svg>
      </span>
      <PrettyChatWindow
        projectId="4128f052-a8b8-46be-8304-55cd3f68a578"
        username={props.user.username} // adam
        secret={props.user.secret} // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChatsPage;
