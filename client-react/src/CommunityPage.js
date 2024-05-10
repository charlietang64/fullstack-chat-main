import React, { useState }  from 'react';
import './communityStyles.css';
import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine'
import Chats from "./chat";

/**
 * The `CommunityPage` components serves as a container for rendering a specific chat room
 * within the Chat Engine. It wraps the chat functionality using the `ChatEngineWrapper`,
 * establishes a connection to a chat room using the `ChatSocket`, and displays the chat
 * messages and allows message sending through the `ChatFeed`.
 * 
 * This component requires the `react-chat-engine` library to be properly set up in your project,
 * including having a valid project ID, chat ID, and chat access key from Chat Engine.
 * 
 * Props:
 * - user: An object that must contain the username of the currently logged-in user. This information
 *   is used to connect the user to the chat room as a sender.
 * 
 * Usage:
 * <CommunityPage user={{ username: 'johndoe' }} />
 * 
 * Note: Make sure to replace the `projectID`, `chatID`, and `chatAccessKey` with your own values from
 * your Chat Engine project to properly connect and interact with your chat instance.
 */
const CommunityPage = (props) => {
    const [showChats, setShowChats] = useState(false); // State to control the display of ChatsPage
  
    const handleIconClick = () => {
      setShowChats(true); // Update the state to show ChatsPage
    };
  
    if (showChats) {
      return <Chats user={props.user} />; // Render ChatsPage if showChats is true
    }
return (
    <div class='community-page'>

        <span
          role="img"
          aria-label="house"
          className="anticon anticon-house ce-custom-header-icon"
          onClick={handleIconClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
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
    <ChatEngineWrapper>
        <ChatSocket
            offset={-7}
            projectID='8242613e-ac4c-402a-b119-71bc424d4390'
            chatID='248933'
            chatAccessKey='ca-a9cf5b6a-3ff6-40b3-bc84-6287c5ee1866'
            senderUsername={props.user.username}
        />

        <ChatFeed activeChat='248933' /> 
    </ChatEngineWrapper>
    </div>
)
}

export default CommunityPage;