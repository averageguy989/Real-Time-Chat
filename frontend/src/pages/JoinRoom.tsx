import { useNavigate } from 'react-router-dom';
import { useRoom } from "../hooks/useRoomContext";
import { useState } from "react";
import Error from "../components/Error";

function JoinRoom() {
    const {roomId,setRoomId} = useRoom();
    const [error,setError] = useState("");

    const naviagate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d{0,5}$/.test(value)) {
            setRoomId(Number(value));
        }else{
            setError("Room ID must be 5 digits");
        }
    }

    const handleJoinRoom = () => {
        if(roomId.toString().length !== 5){
            setError("Room ID must be 5 digits");
            return;
        }
        naviagate(`/chat-room/${roomId}`)
    }

    return (
        <div>
            <h1>Join Room</h1>
            <input
                type='text'
                placeholder="Enter 5 digit Room ID"
                value={roomId==0 ? "":roomId.toString()}
                maxLength={5}
                onChange={handleChange}
            />
            <button
                onClick={handleJoinRoom}
            >
                Join Room
            </button>
            {error && <Error message={error} />}
        </div>
    )
}

export default JoinRoom;