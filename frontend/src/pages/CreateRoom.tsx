import { useNavigate } from "react-router-dom";
import { useRoom } from "../hooks/useRoomContext"; // ✅ Custom hook
import Error from "../components/Error";
import { useState,useEffect } from "react";
import socket from "../sockets/socket";

function CreateRoom() {
    const [error, setError] = useState("");
    const { roomId, setRoomId } = useRoom(); // ✅ Accessing context state
    const navigate = useNavigate(); // ✅ React Router navigation

    useEffect(() => {
        socket.on("Error", (error: string) => {
            setError(error);
        });

        socket.on("RoomCreated", (roomId: number) => {
            setRoomId(roomId);
            navigate("/join-room");
        });
        
        return () => {
            socket.off("Error");
            socket.off("RoomCreated");
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d{0,5}$/.test(value)) {
            setRoomId(Number(value));
            setError("");
        }else{
            setError("Room ID must be 0-9 digits");
        }
    }

    const handleCreateRoom = () => {
        if(roomId.toString().length !== 5){
            setError("Room ID must be 5 digits");
            return;
        }
        console.log(roomId);
        socket.emit("CreateRoom", roomId);
    }



    return (
        <div>
            <h1>Create Room</h1>
            <input
                type="text"
                placeholder="Enter 5 digit Room ID"
                value={roomId==0 ? "":roomId.toString()}
                onChange={handleChange}
                maxLength={5}
            />
            <button onClick={handleCreateRoom}>
                Create Room
            </button>
            {error && <Error message={error}/>}
        </div>
    );
}

export default CreateRoom;
