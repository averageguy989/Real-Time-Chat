import { createContext,useState } from "react";

type RoomContextType = {
    roomId: number;
    setRoomId: (id: number) => void;
    name: string;
    setName: (name: string) => void;
}

export const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider = ({children}: {children: React.ReactNode}) => {
    const [roomId,setRoomId] = useState(0);
    const [name,setName] = useState('');

    return(
        <RoomContext.Provider value={{roomId,setRoomId,name,setName}}>
            {children}
        </RoomContext.Provider>
    );
};

