import { error } from "console";
import { Server, Socket } from "socket.io";

const io = new Server(8080, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

console.log('WebSocket server is running on ws://localhost:8080');

type player = {
    name: string;
    socket: Socket;
}

type Room = {
    id: number;
    players: player[];
}

const rooms: Room[] = [];


function createRoom(id: number, socket: Socket): any{
    for(let i = 0; i < rooms.length; i++){
        if(rooms[i].id === id){
            socket.emit("Error", "Room already exists");
            return;
        }
    }
    const room: Room = { id, players: [] };
    rooms.push(room);
    socket.emit("RoomCreated", id);
    return;
}

function joinRoom(id: number,name: string, socket: Socket): any{
    for(let i = 0; i < rooms.length; i++){
        if(rooms[i].id === id){
            rooms[i].players.push({name,socket});
            socket.emit("RoomJoined", id);
            return;
        }
    }
    socket.emit("Error", "Room not found");
    return;
}

function SendMessage(id: number, name: string, message: string, socket: Socket): void {
    for (let i = 0; i < rooms.length; i++) {

        if (rooms[i].id === id) {
            
            const ChatRoom: Room = rooms[i];
            let found = false;

            for (let j = 0; j < ChatRoom.players.length; j++) {
                if (ChatRoom.players[j].socket === socket) {
                    found = true;
                    break;
                }
            }

            if (found) {
                // Send message to all players except the sender
                ChatRoom.players.forEach(player => {
                    if (player.socket !== socket) {
                        player.socket.emit("ReceiveMessage", { name, message });
                    }
                });
                socket.emit("MessageReceived",message);
                return;
            } else {
                socket.emit("Error", "You are not in the room. Join the room first.");
                return;
            }
        }
    }

    socket.emit("Error", "Room not found.");
    return;
}

function LeaveRoom(id: number, name: string, socket: Socket): any {
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].id === id) {
            const room = rooms[i];

            room.players = room.players.filter(player => player.socket.id !== socket.id);

            console.log(`User ${name} left room ${id}`);

            if (room.players.length === 0) {
                rooms.splice(i, 1);
                console.log(`Room ${id} deleted because it's empty.`);
            }
            return;
        }
    }
    return;
}


io.on("connection", (socket: Socket) => {
    console.log("A user connected");
    socket.on("CreateRoom", (id: number) => {
        console.log("Creating room", id);
        createRoom(id, socket);
    });

    socket.on("JoinRoom", (id: number,name: string) => {
        console.log("Joining room", id);
        joinRoom(id,name,socket);
    });

    socket.on("SendMessage", ({ id, name, message }: { id: number; name: string; message: string }) => {
        SendMessage(id, name, message, socket);
    });    

    socket.on("LeaveRoom",({id,name}: {id: number; name: string}) => {
        LeaveRoom(id,name,socket);
    }) 
    socket.on("disconnect", () => {
        console.log("A user disconnected")
    })
});



