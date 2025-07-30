import { error } from "console";
import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

type playerSocket = WebSocket & {
    isAlive: boolean;
}

type room = {
    id: number;
    players: playerSocket[];
}

const rooms: room[] = [];

function createRoom(id: number, ws: playerSocket): any{
    for(let i=0;i<rooms.length;i++){
        if(rooms[i].id === id){
            ws.send(JSON.stringify({ type: "error", message: "Room already exists" }));
            return;
        }
    }
    rooms.push({
        id: id,
        players: []
    });
    ws.send(JSON.stringify({ type: "success", message: "Successfully created room" }));
    return;
}

function joinRoom(id: number, ws: playerSocket, name: string): any {
    for(let i=0;i<rooms.length;i++){
        if(rooms[i].id === id){
            rooms[i].players.push(ws);
            for(let j=0;j<rooms[i].players.length;j++){
                if(rooms[i].players[j] === ws){
                    rooms[i].players[j].send(JSON.stringify({ type: "success", message: "Successfully joined room", name: name }));
                }
            }
            return;
        }
    }
    ws.send(JSON.stringify({ type: "error", message: "Room not found" }));
    return;
}

function leaveRoom(id: number, ws: playerSocket, name: string): any {
    for(let i=0;i<rooms.length;i++){
        if(rooms[i].id === id){
            rooms[i].players = rooms[i].players.filter(player => player !== ws);
            for(let j=0;j<rooms[i].players.length;j++){
                if(rooms[i].players[j] === ws){
                    rooms[i].players[j].send(JSON.stringify({ type: "success", message: "Successfully left room", name: name }));
                }
            }
            return;
        }
    }
    ws.send(JSON.stringify({ type: "error", message: "Room not found" }));
    return;
}

function sendMessage(id: number, ws: playerSocket, message: string): any {
    for(let i=0;i<rooms.length;i++){
        if(rooms[i].id === id){
            rooms[i].players.forEach(player => player.send(JSON.stringify({ type: "message", message: message })));
            return;
        }
    }
    ws.send(JSON.stringify({ type: "error", message: "Room not found" }));
    return;
}

wss.on("connection", (ws: playerSocket) => {
    console.log("Client connected");

    ws.on("pong", () => { 
        ws.isAlive = true;
    });

    ws.on("message", (message: any) => {
        const data = JSON.parse(message.toString());
        if (data.type === "createRoom") {
            createRoom(data.id, ws);
        } else if (data.type === "joinRoom") {
            console.log("Joining room");
            joinRoom(data.id, ws, data.name);
        } else if (data.type === "leaveRoom") {
            console.log("Leaving room");
            leaveRoom(data.id, ws, data.name);
        } else if (data.type === "sendMessage") {
            sendMessage(data.id, ws, data.message);
        }
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});


setInterval(() => {
    for(let i=0;i<rooms.length;i++){
        rooms[i].players.forEach(player => {
            if(!player.isAlive){
                player.close();
                rooms[i].players = rooms[i].players.filter(p => p !== player);
            } else {
                player.isAlive = false;
                player.ping();
            }
        });
        if(rooms[i].players.length === 0){
            rooms.splice(i, 1);
        }
    }
}, 30000);

wss.on("error", (error) => {
    console.error("WebSocket error:", error);
});