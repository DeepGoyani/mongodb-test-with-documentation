# Social Network Platform - API Documentation

This repository contains the backend code for a social network platform built with MongoDB. The platform provides features like user management, connections, posts, and messaging, alongside additional functionalities such as profile views tracking, skill management, and premium account upgrades.

## Features

### User Management
- **CRUD Operations**: Allows you to create, read, update, and delete user profiles.
- Users can update their headlines, view their profile, and manage personal details.

### Connections
- **Send/Accept/Delete Connections**: Users can send and accept connection requests, as well as remove connections when necessary.
- Fetch all connections of a specific user to manage their network.

### Posts
- **Create, Like, Delete Posts**: Users can share posts, like them, and delete their own posts.
- Post content and track likes to measure engagement.

### Messages
- **Send/Delete Messages**: Users can send direct messages to others and delete them when needed.
- Messages support one-to-one communication between users.

### Miscellaneous Features
- **Profile Views Tracking**: Track the number of times a user's profile has been viewed.
- **Skills Management**: Users can add new skills to their profile to showcase their expertise.
- **Premium Account Upgrade**: Users can upgrade their account to premium status to access exclusive features.

## API Endpoints

The API provides several RESTful endpoints to interact with the platform's core features. Here are some of the key endpoints:

### User Management:
- `GET /users`: Fetch all users.
- `GET /users/:userId`: Fetch a specific user.
- `POST /users`: Create a new user.
- `PATCH /users/:userId`: Update user details.
- `DELETE /users/:userId`: Delete a user.

### Connections:
- `GET /connections/:userId`: Fetch all connections for a user.
- `POST /connections`: Send a connection request.
- `PATCH /connections/:connectionId`: Accept a connection request.
- `DELETE /connections/:connectionId`: Remove a connection.

### Posts:
- `GET /posts`: Fetch all posts.
- `GET /posts/:postId`: Fetch a specific post.
- `POST /posts`: Create a new post.
- `PATCH /posts/:postId/likes`: Like a post.
- `DELETE /posts/:postId`: Delete a post.

### Messages:
- `GET /messages/:userId`: Fetch messages for a user.
- `POST /messages`: Send a message.
- `DELETE /messages/:messageId`: Delete a message.

### Miscellaneous:
- `GET /users/:userId/profile-views`: Fetch the profile views count for a user.
- `PUT /users/:userId/skills`: Add a new skill to a user's profile.
- `PATCH /users/:userId/premium`: Upgrade a user's account to premium.

## Technologies Used
- **MongoDB**: A NoSQL database used for data storage and retrieval.
- **Node.js**: The backend framework for building the API.
- **Express.js**: The web framework used to handle API routing and server setup.

# Here is the link of postman api documentation 
https://documenter.getpostman.com/view/39216507/2sAYQUptZa
# This is the link of the docmentation handritten of all tasks of google drive 
https://drive.google.com/file/d/1XgGGwX5Lpi3JtxS2dYMt8U1IZFjrOBuJ/view