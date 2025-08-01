// Create a new file (e.g., `types/socket.d.ts`) or include at the top of your main file:

import "socket.io";

declare module "socket.io" {
    interface Socket {
        isAlive?: boolean;
    }
}

