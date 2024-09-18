# Dev Tinder

Dev Tinder is a social networking platform for developers to connect, collaborate, and engage with one another. This project is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Users can create profiles, send connection requests, and accept or reject collaboration requests, similar to a developer version of Tinder for professional networking.

## Features

- **User Authentication**:
  - Signup and Login using JWT-based authentication.
  
- **Profile Management**:
  - Users can create, view, update, and delete their profiles.
  - Each profile includes developer details like name, bio, skills, and interests.
  
- **Connection Requests**:
  - Users can send connection requests to other developers.
  - They can accept or reject connection requests.
  - Request status: interested, accepted, or rejected.

- **Friend Connections**:
  - View all pending requests and established connections.

## CRUD Operations

The application follows the standard CRUD operations on resources:

| HTTP Method | Endpoint              | Description                         |
|-------------|-----------------------|-------------------------------------|
| **POST**    | `/signup`             | Create a new user                   |
| **POST**    | `/login`              | Log in as an existing user          |
| **GET**     | `/profile`            | View the current user's profile     |
| **POST**    | `/profile`            | Create a new profile for the user   |
| **PATCH**   | `/profile`            | Update the user's profile           |
| **DELETE**  | `/profile`            | Delete the user's profile           |
| **POST**    | `/sendRequest`        | Send a connection request           |
| **POST**    | `/reviewRequest`      | Accept/Reject a connection request  |
| **GET**     | `/requests`           | View all connection requests        |
| **GET**     | `/connections`        | View all established connections    |

## Project Structure

```
/backend
  ├── models         # Database schemas (User, Profile, etc.)
  ├── routes         # API routes (auth, profile, connection requests)
  ├── controllers    # Functions to handle logic for each route
  └── server.js      # Entry point for the server

/frontend
  ├── src
      ├── components # React components (Profile, Dashboard, etc.)
      ├── pages      # Main pages (Signup, Login, Profile)
      ├── services   # API calls (Axios for HTTP requests)
      └── App.js     # Main React app file
```

<!-- ## Technologies Used

### Backend:
- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for building the RESTful APIs.
- **MongoDB**: NoSQL database for storing user profiles and connection requests.
- **Mongoose**: ODM library for MongoDB and schema validation.
- **JWT (JSON Web Tokens)**: Used for user authentication and securing API endpoints.

### Frontend:
- **React.js**: JavaScript library for building the user interface.
- **Axios**: HTTP client for making requests to the backend.
- **Bootstrap/Tailwind CSS**: CSS framework for styling the front-end components.

### Other Tools:
- **Git**: Version control.
- **Postman**: API testing.
- **Heroku/Netlify**: Deployment platform.

## Getting Started

### Prerequisites
- **Node.js** installed on your local machine
- **MongoDB** installed locally or a cloud MongoDB instance (MongoDB Atlas)
- **npm** or **yarn** package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/dev-tinder.git
cd dev-tinder
```

2. Install dependencies for both backend and frontend:

```bash
# For backend
cd backend
npm install

# For frontend
cd frontend
npm install
```

3. Create a `.env` file in the backend directory and add the following environment variables:

```bash
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=3000
```

4. Run the application:

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm start
```

## API Endpoints

### Signup

- **POST** `/signup`
- Request body:
  ```json
  {
    "email": "developer@example.com",
    "password": "yourpassword",
    "name": "John Doe"
  }
  ```
- Response:
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```

### Login

- **POST** `/login`
- Request body:
  ```json
  {
    "email": "developer@example.com",
    "password": "yourpassword"
  }
  ```
- Response:
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```

### Send Connection Request

- **POST** `/sendRequest`
- Request body:
  ```json
  {
    "toUserId": "userID_to_send_request"
  }
  ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a pull request
 -->
