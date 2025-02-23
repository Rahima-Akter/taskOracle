## 🌿 TaskOracle Server - Task Management System
Welcome to TaskOracle Server, a simple and powerful task management backend built with Node.js and MongoDB. This project is designed to help users manage their daily tasks with ease and efficiency. It comes with essential features for handling tasks in a fast and secure environment.

## 📋 Features
✅ Task management: Create, read, update, and delete tasks.
⚡ Express framework for building the API.
🗄️ MongoDB for storing tasks and user data.
🔐 Environment variable management using dotenv.
📊 Logging via Morgan for request logging.

## 🛠️ Technologies Used
Node.js: JavaScript runtime used to build the server.
Express.js: Web framework to handle routing and server logic.
MongoDB: NoSQL database to store tasks and data.
CORS: Handling cross-origin requests securely.
dotenv: Environment configuration for sensitive information.
Morgan: HTTP request logger middleware.

## 📥 Installation Instructions
# 🖥️ Prerequisites
Node.js: Ensure you have Node.js installed. You can download it from here.
MongoDB: Ensure you have a MongoDB instance running locally or remotely.

## ⚙️ Steps to Get Started
***Clone the repository: Open your terminal and run the following command to clone the repository to your local machine: ***

```bash
git clone https://github.com/Rahima-Akter/taskOracle.git
```
```bash
cd taskOracle-server
```
# Install dependencies: Install all the required dependencies listed in the package.json file by running:
``` bash
npm install
```
*** Set up environment variables: Create a .env file in the root of the project to store sensitive information like MongoDB connection string. Example ***:

*** .env ***
*** MONGODB_URI=mongodb://your-mongodb-uri ***
*** Start the server: ***

# To start the server in production mode, run:

``bash
npm start
```
*** To start the server in development mode (with auto-reloading), run *** :

``` bash
npm run dev
```
# Access the server: Your server should now be running on http://localhost:9000 (or whichever port you have configured).

## 🌐 API Endpoints
*** You can interact with the backend through the following API endpoints***:

*** GET /tasks - Fetch all tasks. ***
*** POST /tasks - Create a new task. ***
*** PUT /tasks/:id - Update an existing task by ID. ***
*** DELETE /tasks/:id - Delete a task by ID. ***



## 🤝 Contributing
*** Feel free to fork and contribute to this project! Here's how you can help: ***

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a new pull request.

## 📬 Contact
For any questions or suggestions, please contact me directly!

## Happy Task Managing! 🚀