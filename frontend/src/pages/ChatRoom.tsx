import { useState } from "react";
import socket from "../sockets/socket";
import { useEffect } from "react";
import Error from "../components/Error";
import ChatMessages from "../components/ChatMessages";
import { useParams,useNavigate } from "react-router-dom";

type MessageType = {
    username: string;
    message: string;
    isSender: boolean;
};

function ChatRoom() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [error, setError] = useState("");
    const name = "chandru";
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!roomId || !/^\d{5}$/.test(roomId)){
            navigate("/"); 
        }
    },[roomId, navigate])

    useEffect(() => {
        if (roomId) {
            socket.emit("JoinRoom", parseInt(roomId, 10), name);
        }
    }, [roomId, name]);

    useEffect(() => {
       const  handleReceiveMessage = ({ name, message }: { name: string; message: string }) => {
            const newMessage: MessageType = {
              username: name,
              message,
              isSender: false
            };
            console.log(message);
            
            setMessages(prev => [...prev, newMessage]);
          };
    
        const handleMessageReceived = (message: string) => {
            const newMessage: MessageType = {
                username: "You",
                message,
                isSender: true
            };
            setMessages(prev => [...prev, newMessage]);
        };
    
        const handleError = (message: string) => {
            setError(message);
        };
    
        socket.on("ReceiveMessage", handleReceiveMessage);
        socket.on("MessageReceived", handleMessageReceived);
        socket.on("Error", handleError);
    
        return () => {
            socket.off("ReceiveMessage", handleReceiveMessage);
            socket.off("MessageReceived", handleMessageReceived);
            socket.off("Error", handleError);
        };
    }, []);
    


    const handleMessage = (): void => {
        if(message.length==0){
            return;
        }
        socket.emit("SendMessage", { 
            id: parseInt(roomId!, 10), 
            name: name, 
            message: message 
        });
        console.log(messages.length);
        setMessage("");
    };    

    const handleLaveRoom = (): void => {
        socket.emit("LeaveRoom",{
            id: parseInt(roomId!, 10), 
            name: name, 
        })

        navigate("/");
    }



    return <div>
        <h1>Chat Room</h1>
        <button onClick={handleLaveRoom}>Leave Room</button>
        <ChatMessages messages={messages}/>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={handleMessage}>Send</button>
        {error && <Error message={error} />}
    </div>
}

export default ChatRoom;