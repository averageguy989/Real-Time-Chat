import React from "react";
import styles from "./Message.module.css";

type MessageProps = {
    username: string;
    message: string;
    isSender: boolean;
}

const Message : React.FC<MessageProps> = ({ username, message, isSender }) => {
    return (
        <div className={`${styles.message} ${isSender?styles.own: styles.other}`} >
            <strong>{username}</strong>: {message}
        </div>
    )
}

export default Message;