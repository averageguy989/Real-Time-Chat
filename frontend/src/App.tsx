import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import ChatRoom from "./pages/ChatRoom";
import { RoomProvider } from "./context/RoomContext";

function App() {

  return <BrowserRouter>
    <RoomProvider>
      <Routes>
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/join-room" element={<JoinRoom />} />
          <Route path="/chat-room/:roomId" element={<ChatRoom />} />
          <Route path="/" element={<Home />} />
      </Routes>
    </RoomProvider>
  </BrowserRouter>;
}

export default App;