import React from 'react';
import './chatstyles.css';
import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine'

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
    return (
        <div style={{ height: '100vh', width: '100vw', color: '#fff' }}>
            <ChatEngineWrapper>
                <ChatSocket
                    projectID='4128f052-a8b8-46be-8304-55cd3f68a578'
                    chatID='237733'
                    chatAccessKey='ca-264b4109-a70d-4e25-8f4b-0a1aabc70eb7'
                    senderUsername={props.user.username}
                />
                <ChatFeed activeChat='237733' /> 
            </ChatEngineWrapper>

            <style>{`
                
            `}</style>
        </div>
    );
};

export default CommunityPage;