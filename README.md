# Role-Based Ticketing System

A role-based support ticketing system where users can create tickets and admins can manage them. Built with Node.js (Express.js) for the backend, React.js for the frontend, and MongoDB for the database.

# Features

User Authentication: JWT-based login and signup.

## Role-Based Access:

User: Can create and view their own tickets.

Admin: Can view, update, and manage all tickets.

## Ticket Management:

Users can create tickets with a title and description.

Admins can update ticket status (Open, In Progress, Closed).

Responsive UI: Built with Tailwind CSS for a clean and modern design.

# Live Demo

Check out the deployed project here:
👉 https://ticketing-system-beta.vercel.app/

## Credentials for Testing

You can use the following credentials to log in and test the system:

1. User Account
   Username: User

   Password: 123456

2. Admin Account
   Username: Admin

   Password: 123456

3. Sign Up
   You can also create a new user account by signing up. However, new users will have the User role by default. To access admin features, use the admin credentials provided above.

# Installation

Run the following command to install all required dependencies for both the front-end and back-end:

## Backend:

cd server

```bash
npm install
```

Running the API
To run the API (Node.js with Express), use the following command:

```bash
npm run dev
```

## Front-End

cd client

```bash
npm install
```

```bash
npm run dev
```

This will start the front-end and serve the content, usually accessible at http://localhost:5173.
