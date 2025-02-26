# 🌐 **TaskOracle Client** - Frontend for Task Management System

Welcome to **TaskOracle Client**, the frontend of the **TaskOracle Server**, built with **React** and modern web technologies like **Vite**, **Tailwind CSS**, and **Firebase**. This project provides a sleek, responsive user interface to interact with the Task Management API.

---

## 📋 **Features**

- ✅ **Task management**: Create, read, update, and delete tasks from the UI.
- ⚡ **React** for a fast, dynamic user interface.
- 🎨 **Tailwind CSS** for utility-first styling.
- 🔐 **Firebase authentication** for secure user login.
- 🔄 **React Query** for data fetching and state management.
- ⚙️ **React Router** for seamless navigation between pages.
- 🔔 **SweetAlert2** for alerts and notifications.
- 🌀 **React Spinners** for loading indicators.
- 📦 **Vite** for fast builds and development server.

---

## 🛠️ **Technologies Used**

- **React**: A JavaScript library for building user interfaces.
- **Vite**: Next-generation, fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for fast styling.
- **React Router**: For navigation and routing in the app.
- **Firebase**: Used for user authentication.
- **React Query**: Data fetching and synchronization library.
- **Axios**: For making HTTP requests to the backend API.
- **SweetAlert2**: For beautiful alerts and notifications.
- **@hello-pangea/dnd**: For drag-and-drop functionality in the UI.

---

## 📥 **Installation Instructions**

### 🖥️ **Prerequisites**

- **Node.js**: Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **Firebase**: Set up a Firebase project and get your API keys for authentication.

---

### ⚙️ **Steps to Get Started**

1. **Clone the repository**:
   
- Open your terminal and run the following command to clone the repository to your local machine:

```bash
git clone https://github.com/Rahima-Akter/taskOracle.git
```
```bash
cd taskoracle-client
```
2. **Install dependencies:**:
- Install all the required dependencies listed in the package.json file by running:

``` bash
npm install
```
3. **Set up Firebase:**:
- Create a .env file in the root of the project.

- 🟢 Add your Firebase configuration variables, such as:

- 🔱 VITE_FIREBASE_API_KEY=your-api-key
- 🔱 VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
- 🔱 VITE_FIREBASE_PROJECT_ID=your-project-id
- 🔱 VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
- 🔱 VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
- 🔱 VITE_FIREBASE_APP_ID=your-app-id
- 🔱 Start the development server:

4. **To start the server in development mode (with hot reloading), run:**:
```bash
npm run dev
```
- The application should now be running on http://localhost:5173.(or whichever port you have configured).

### 🌐 Pages and Routing
- The frontend consists of multiple pages and uses React Router for navigation:

- 🔱 Home: Displays the task list and task creation form.
- 🔱 Login: Allows users to authenticate via Firebase.
- 🔱 Not Found: A 404 page for non-existent routes.

### 🤝 Contributing
- Feel free to fork and contribute to this project! Here's how you can help:

- 🔱 Fork the repository.
- 🔱 Create a new branch (git checkout -b feature-branch).
- 🔱 Commit your changes (git commit -am 'Add new feature').
- 🔱 Push to the branch (git push origin feature-branch).
- 🔱 Create a new pull request.

### 📬 Contact
- For any questions or suggestions, please contact me directly!

### 🚀 Happy Task Managing!