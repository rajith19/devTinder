## DevTinder - MERN Stack Application

**DevTinder** is a MERN stack project designed for developers to connect and interact with each other. The project is structured into two main parts: the **backend** API (Node.js/Express) and the **frontend** (React.js) that interacts with the API.

### Project Structure
```
devTinder/
├── backend/              # Backend API built with Node.js, Express, and MongoDB
│   ├── src/
│   │   ├── config/         # Database configuration and environment settings
│   │   ├── middlewares/    # Authentication and other middlewares
│   │   ├── models/         # Mongoose schemas and models (User, ConnectionRequest)
│   │   ├── routes/         # API routes for auth, profile, and requests
│   │   └── utils/          # Custom utility functions like validation
│   └── app.js             # Express app entry point
│
└── frontend/             # Frontend built with React.js
    ├── src/
    │   ├── components/     # React components (Profile, Feed, Requests)
    │   ├── services/       # API services to interact with the backend
    │   └── App.js          # Main React app
    └── package.json       # Frontend dependencies and scripts
```

### Features
1. **User Authentication**: 
   - JWT-based authentication for secure access (backend).
   - Login and signup pages for users (frontend).
2. **Connection Requests**: 
   - Users can send, accept, and reject connection requests.
3. **User Profiles**: 
   - Users can view and edit their profiles.
4. **Feed**: 
   - Discover and connect with other users via the user feed.
5. **Pagination**: 
   - Pagination for feed data from the backend.

### GitHub Repository

You can find the source code for the project here:  
[**DevTinder Repository**](https://github.com/rajith19/devTinder)

### Backend Installation and Setup (Node.js/Express/MongoDB)

1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `backend` directory and add your MongoDB URI and other configurations:
   ```
   MONGO_URI=mongodb://<username>:<password>/devtinder
   JWT_SECRET=your_jwt_secret
   PORT=your_port_number
   ```

4. **Run the backend server**:
   ```bash
   npm start
   ```

The backend server will be available on `http://localhost:3000`.

### Frontend Installation and Setup (React.js)

1. **Navigate to the frontend folder**:
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Start the React development server**:
   ```bash
   npm start
   ```

The frontend server will be available on `http://localhost:3001` (or another port if specified).

### API Endpoints (Backend, also attached postman collection JSON file for API reference)

#### Auth Routes
- **POST** `/signup`: Registers a new user.
- **POST** `/login`: Authenticates a user and returns a JWT.
- **POST** `/logout`: Logs out the user.

#### Profile Routes
- **GET** `/profile`: Retrieves the authenticated user's profile.
- **PATCH** `/profile/edit`: Updates the authenticated user's profile.
- **PATCH** `/profile/password`: Changes the password for the authenticated user.

#### Connection Requests
- **POST** `/request/send/:status/:toUserId`: Sends a connection request to another user. Status can be `interested` or `ignored`.
- **POST** `/request/review/accepted`: Reviews and accepts a connection request.
- **POST** `/request/review/rejected`: Reviews and rejects a connection request.

#### Feed
- **GET** `/feed?page=1&limit=10`: Retrieves a paginated feed of users for discovery and potential connection.


### Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.
