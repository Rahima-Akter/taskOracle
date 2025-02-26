# 🌿 **TaskOracle** - Task Management System

Welcome to **TaskOracle**, a full-stack task management system with both **frontend** and **backend** built using modern technologies like **React**, **Node.js**, **MongoDB**, **Firebase**, **Tailwind CSS**, and **Vite**. This project allows users to manage tasks efficiently in a fast and secure environment.

---

## 📋 **Features**

- ✅ **Task management**: Create, read, update, and delete tasks from both the frontend and backend.
- ⚡ **React frontend** for a fast, dynamic user interface.
- 🎨 **Tailwind CSS** for utility-first styling on the frontend.
- 🔐 **Firebase authentication** for secure user login on the frontend.
- 🗄️ **MongoDB** for storing tasks and user data in the backend.
- 🔄 **React Query** for data fetching and state management on the frontend.
- ⚙️ **Express API** for handling task data and user management in the backend.
- 🛠️ **CORS** for secure communication between frontend and backend.
- 📝 **Logging** via **Morgan** for request logging in the backend.

---

## 🛠️ **Technologies Used**

### **Frontend**:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: Next-generation, fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for fast styling.
- **React Router**: For navigation and routing in the app.
- **Firebase**: Used for user authentication.
- **React Query**: Data fetching and synchronization library.
- **Axios**: For making HTTP requests to the backend API.
- **SweetAlert2**: For beautiful alerts and notifications.
- **@hello-pangea/dnd**: For drag-and-drop functionality in the UI.

### **Backend**:

- **Node.js**: JavaScript runtime used to build the server.
- **Express.js**: Web framework to handle routing and server logic.
- **MongoDB**: NoSQL database to store tasks and data.
- **CORS**: Handling cross-origin requests securely.
- **dotenv**: Environment configuration for sensitive information.
- **Morgan**: HTTP request logger middleware.

---

## 📥 **Installation Instructions**

### 🖥️ **Prerequisites**

- **Node.js**: Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **MongoDB**: Ensure you have a MongoDB instance running locally or remotely.
- **Firebase**: Set up a Firebase project and get your API keys for authentication.

---

### ⚙️ **Steps to Get Started**

1. **Clone the repositories**:

- Clone the repository for both frontend and backend :

```bash
git clone https://github.com/Rahima-Akter/taskOracle.git
```

2. **Set up the frontend**:

- Navigate to the frontend directory and install dependencies:

```bash
cd taskoracle-client
npm install
```

- Set up Firebase configuration in the `.env` file:

```ini
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

3. **Set up the backend**:

- Navigate to the backend directory and install dependencies:

```bash
cd taskoracle-server
npm install
```

- Set up environment variables for the backend in the `.env` file:

```ini
MONGODB_URI=mongodb://your-mongodb-uri
```

4. **Start the backend server**:

- To start the backend server in production mode:

```bash
npm start
```

- Or for development mode (with auto-reloading):

```bash
npm run dev
```

- The backend should now be running on `https://task-oracle-server.vercel.app` (or the configured port).

5. **Start the frontend development server**:

- To start the frontend in development mode:

```bash
cd taskoracle-client
npm run dev
```

- The frontend should now be running on `http://localhost:5173`. (or whichever port you have configured).

---

## 🌐 **API Endpoints**

You can interact with the backend through the following API endpoints:

- **GET /tasks** - Fetch all tasks.
- **POST /tasks** - Create a new task.
- **PUT /tasks/:id** - Update an existing task by ID.
- **DELETE /tasks/:id** - Delete a task by ID.

---

## 🤝 **Contributing**

Feel free to fork and contribute to this project! Here's how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new pull request.

---

## 📬 **Contact**

For any questions or suggestions, please contact me directly!

---

## 🚀 **Happy Task Managing!**
