# Event Management App

An **Event Management App** built with a **Vite** frontend and a **Node.js** backend. This project allows users to create, manage, and attend events. It also includes role-based authentication, RSVP ticket management, and more.

## Features

- **Event CRUD**: Create, Read, Update, and Delete events.
- **Role-Based Authentication**: Different access levels for users (e.g., Admin, Organizer, Attendee).
- **RSVP Ticket Management**: Attendees can RSVP to events and manage tickets.
- **Ticket Count**: Track the number of available and booked tickets.
- **User Dashboard**: Personalized dashboard for users to manage their events and RSVPs.
- **Other Features**: Various other functionalities to streamline event management.

## Tech Stack

- **Frontend**: Vite (React)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for data modeling)
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Tailwind CSS or any styling library (if applicable)
- **Other Tools**: 
  - Redux for state management
  - Axios for API calls

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/priyanka-dudhat-27/event-management-app.git
   cd event-management-app
    ```

2. **Install dependencies:**

   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

   - For the backend:
     ```bash
     cd backend
     npm install
     ```

3. **Set up environment variables:**

   Create a `.env` file in the `backend` directory with the following variables:

   ```
   PORT=5000
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   ```

4. **Start the development server:**

   - **Frontend:**
     ```bash
     cd frontend
     npm run dev
     ```

   - **Backend:**
     ```bash
     cd backend
     npm start
     ```

5. **Visit the app:**

   The frontend should now be running on `http://localhost:3000` and the backend API on `http://localhost:5000`.

### Folder Structure

```
├── frontend/      # Vite-based React frontend
│   ├── src/       # Source files (components, pages, etc.)
│   └── ...
├── backend/       # Node.js backend
│   ├── controllers/  # Request handlers for each route
│   ├── models/       # Mongoose schemas and models
│   ├── routes/       # API routes
│   ├── middlewares/  # Custom middleware for authentication, error handling, etc.
│   └── ...
└── README.md
```

### API Endpoints

- **Authentication:**
  - \`POST /api/auth/register\`: Register a new user
  - \`POST /api/auth/login\`: Log in and receive a JWT token
  - \`GET /api/auth/me\`: Get the authenticated user's info

- **Event Management:**
  - \`GET /api/events\`: Get a list of all events
  - \`POST /api/events\`: Create a new event (Admin/Organizer only)
  - \`PUT /api/events/:id\`: Update an event (Admin/Organizer only)
  - \`DELETE /api/events/:id\`: Delete an event (Admin/Organizer only)

- **RSVP & Ticket Management:**
  - \`POST /api/events/:id/rsvp\`: RSVP for an event
  - \`GET /api/events/:id/tickets\`: Get the list of RSVP tickets for an event
  - \`POST /api/events/:id/tickets\`: Create a new ticket for an event (Admin/Organizer only)

### Roles and Permissions

- **Admin**: Has full access to the system, including managing users and events.
- **Organizer**: Can create, update, and manage their own events.
- **Attendee**: Can browse events, RSVP, and manage their own tickets.

### Testing

You can run tests using a testing framework like Jest or Mocha (depending on what you're using) in both the frontend and backend. Here's how to run tests:

- **Frontend Tests:**
  ```bash
  cd frontend
  npm run test
  ```

- **Backend Tests:**
  ```bash
  cd backend
  npm run test
  ```

### Deployment

1. **Frontend**: 
   - You can build the frontend for production using:
     ```bash
     cd frontend
     npm run build
     ```

   - The production-ready code will be in the \`dist\` folder, which can be served via any static hosting service (Netlify, Vercel, etc.).

2. **Backend**: 
   - Deploy the backend on services like Heroku, AWS, or any other Node.js hosting platform.
   - Make sure to configure the environment variables in your hosting platform.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Contact

For any questions or suggestions, please contact:

- **Name:** Your Name
- **Email:** your.email@example.com
- **GitHub:** [Your GitHub](https://github.com/your-username)
