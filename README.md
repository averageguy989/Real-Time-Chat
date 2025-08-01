# Real-Time Chat App

A modern, real-time chat application built with React, TypeScript, and Socket.IO that allows users to create and join chat rooms for instant messaging.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using WebSocket connections
- **Room Management**: Create and join chat rooms with unique 5-digit room IDs
- **User Interface**: Clean and responsive React-based UI
- **Type Safety**: Full TypeScript implementation for better development experience
- **Error Handling**: Comprehensive error handling for room operations
- **Room Cleanup**: Automatic room deletion when all users leave

## 🔮 Future Features (Planned)

- **🔔 Push Notifications**: Browser notifications for new messages and room activities
- **👤 Username System**: Custom usernames with profile management
- **🎨 Enhanced UI/UX**: Modern design with better styling, animations, and responsive layouts
- **🏓 Ping-Pong Health Check**: Automatic connection monitoring and self-healing mechanisms
- **📱 Mobile Responsiveness**: Optimized experience for mobile devices
- **🎯 User Status**: Online/offline status indicators
- **📝 Message History**: Persistent message storage and retrieval
- **🔍 Search Functionality**: Search through messages and users
- **📎 File Sharing**: Support for image and file uploads
- **🎭 Emoji Support**: Rich emoji picker and reactions
- **🔒 Private Messaging**: Direct messaging between users
- **👥 User Groups**: Create and manage user groups within rooms
- **⚙️ User Preferences**: Customizable themes and settings
- **📊 Room Analytics**: User activity and engagement metrics
- **🔄 Message Editing**: Edit and delete sent messages
- **⏰ Message Scheduling**: Schedule messages for later delivery

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing
- **Socket.IO Client** - Real-time communication
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Socket.IO** - Real-time bidirectional communication
- **TypeScript** - Type-safe server-side code
- **Nodemon** - Development server with auto-restart

## 📁 Project Structure

```
Chat-App/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Socket.IO server implementation
│   │   └── types/
│   │       └── socket.d.ts   # Socket type definitions
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React context for state management
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Application pages
│   │   ├── services/         # API services
│   │   ├── sockets/          # Socket.IO client configuration
│   │   ├── App.tsx           # Main application component
│   │   └── main.tsx          # Application entry point
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/averageguy989/Real-Time-Chat.git
   cd Chat-App
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will start on `http://localhost:8080`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📖 How to Use

1. **Home Page**: Navigate to the home page where you can choose to create or join a room
2. **Create Room**: Click "Create Room" to generate a new chat room with a unique 5-digit ID
3. **Join Room**: Click "Join Room" and enter an existing room ID to join
4. **Chat**: Once in a room, you can send and receive messages in real-time
5. **Leave Room**: Click "Leave Room" to exit the current chat room

## 🔧 Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (placeholder)

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

The application uses Socket.IO events for real-time communication:

### Client to Server Events
- `CreateRoom` - Create a new chat room
- `JoinRoom` - Join an existing room
- `SendMessage` - Send a message to room members
- `LeaveRoom` - Leave the current room
- `Ping` - Health check ping (planned)
- `UpdateUsername` - Update user profile (planned)
- `RequestNotificationPermission` - Enable push notifications (planned)

### Server to Client Events
- `RoomCreated` - Confirmation of room creation
- `RoomJoined` - Confirmation of joining a room
- `ReceiveMessage` - Receive a message from another user
- `MessageReceived` - Confirmation of message sent
- `Error` - Error notifications
- `Pong` - Health check response (planned)
- `UserJoined` - Notify when user joins room (planned)
- `UserLeft` - Notify when user leaves room (planned)
- `Notification` - Push notification data (planned)

## 🔒 Security Features

- Room ID validation (5-digit numeric format)
- User authentication within rooms
- Automatic room cleanup when empty
- Input validation and sanitization
- Connection health monitoring (planned)
- Rate limiting for message sending (planned)
- User session management (planned)

## 🚧 Development

### Adding New Features
1. Create feature branch from main
2. Implement changes with TypeScript
3. Test functionality thoroughly
4. Submit pull request

### Planned Implementation Roadmap

#### Phase 1: Core Enhancements
- [ ] Implement ping-pong health check mechanism
- [ ] Add username system with profile management
- [ ] Enhance UI with modern design system
- [ ] Add mobile responsiveness

#### Phase 2: User Experience
- [ ] Implement push notifications
- [ ] Add user status indicators
- [ ] Create message history persistence
- [ ] Add search functionality

#### Phase 3: Advanced Features
- [ ] File sharing capabilities
- [ ] Emoji support and reactions
- [ ] Private messaging system
- [ ] User groups and permissions

#### Phase 4: Analytics & Optimization
- [ ] Room analytics dashboard
- [ ] Performance optimization
- [ ] Advanced security features
- [ ] Message scheduling system

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Implement proper error handling
- Add comments for complex logic
- Include unit tests for new features
- Follow accessibility guidelines

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Chandru** - [GitHub Profile](https://github.com/averageguy989)

## 🙏 Acknowledgments

- Socket.IO for real-time communication
- React team for the amazing framework
- TypeScript for type safety
- Vite for fast development experience
- 100xDevs for learning opportunities

## 🎯 Learning Goals

This project serves as a comprehensive learning experience for:
- Real-time web application development
- WebSocket communication patterns
- React hooks and context management
- TypeScript implementation
- Modern frontend development practices
- Backend API design and implementation

---

**Note**: This is a learning project for real-time chat application development. Feel free to explore, modify, and enhance the codebase! The planned features represent a roadmap for continuous learning and improvement. 