import React, { useState, useEffect, useRef } from "react";
import { ChatEngine } from 'react-chat-engine';
import CommunityPage from "./CommunityPage";

const Chat = (props) => {
    const [showCommunity, setShowCommunity] = useState(false);
    const chatWindowRef = useRef(null); // Create a ref for the chat window

    const handleIconClick = () => {
        // Show the CommunityPage when the house icon is clicked
        setShowCommunity(true);
    };

    useEffect(() => {
        if (chatWindowRef.current) {
            // Scroll to the bottom of the chat window when it mounts or updates
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [showCommunity]);

    useEffect(() => {
        // Find the dynamically created button
        const newChatButton = document.getElementById('new-chat-plus-button');
        
        if (newChatButton) {
            // Create a new span element
            const newSpan = document.createElement('span');
            newSpan.innerHTML = `
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  focusable="false"
                  data-icon="house"
                  width="1.5em"
                  height="1.5em"
                  fill="white"
                  aria-hidden="true"
                  style="fill: rgb(24, 144, 255); opacity: 1; transition: opacity 0.3s; transform: translateY(6px); cursor: pointer;" // Adjust translateY value to move the house lower and add cursor:pointer
                  onMouseOver="this.style.opacity = '0.66'"
                  onMouseOut="this.style.opacity = '1'"
                  onClick={handleIconClick} // Call handleIconClick function when clicked
                >
                    <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z" />
                </svg>
            `;
            
            // Insert the new span element before the button
            newChatButton.parentNode.insertBefore(newSpan, newChatButton);

            const icon = newSpan.querySelector("svg");
            icon.addEventListener("click", handleIconClick);
        }
    }, []);

    if (showCommunity) {
        // Display the CommunityPage component
        return <CommunityPage user={props.user} />;
    }

    return (
        <div className='container'>
            <div style={{ overflowY: 'auto', height: 'calc(100% - 40px)' }}>
                <ChatEngine
                    offset={-7}
                    projectID="8242613e-ac4c-402a-b119-71bc424d4390"
                    userName={props.user.username}
                    userSecret={props.user.secret}
                />
            </div>
            <style>
                {`html, body {
                        height: 100%; /* Set the height of both html and body to 100% */
                        margin: 0; /* Remove any default margin */
                        padding: 0; /* Remove any default padding */
                        }

                    .container {
                        height: 100%; /* Set the height of the container to 100% */
                        display: flex; /* Use flexbox for layout */
                        flex-direction: column; /* Arrange children in a column */
                        }

                    .container > div {
                        flex: 1; /* Let this div grow to fill the remaining space */

                     .ce-chat-engine {
                        height: 100%;
                     }   

                     .ce-wrapper {
                        height: 100%
                     }

                     .ce-chat-feed-column {
                        height: 100%
                     }
                }`}
            </style>
        </div>
    );
};

export default Chat;