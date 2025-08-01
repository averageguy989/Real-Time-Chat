// components/ChatMessages.tsx
import React from "react";
import Message from "./Message";
import styles from "./ChatMessages.module.css";

type MessageType = {
    username: string;
    message: string;
    isSender: boolean;
};

type ChatMessagesProps = {
    messages: MessageType[];
};

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
    return (
        <div className={styles.chatContainer}>
            {messages.map((msg, index) => (
                <Message
                    key={index}
                    username={msg.username}
                    message={msg.message}
                    isSender={msg.isSender}
                />
            ))}
        </div>
    );
};

export default ChatMessages;
