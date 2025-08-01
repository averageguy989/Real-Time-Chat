
import { useNavigate } from "react-router-dom";



function Home() {
    const navigate = useNavigate();
    return <div>
        <h1>Home</h1>
        <button onClick={() => navigate("/create-room")}>Create Room</button>
        <button onClick={() => navigate("/join-room")}>Join Room</button>
    </div>
}

export default Home;