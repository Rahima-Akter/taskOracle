import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import AddTaskForm from '../components/AddTaskForm'
import Todo from '../components/Category/Todo'
import Done from '../components/Category/Done'
import Progress from '../components/Category/Progress'
import Home from '../components/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <AddTaskForm />
      },
      {
        path: 'todo',
        element: <Todo />
      },
      {
        path: 'progress',
        element: <Progress />
      },
      {
        path: 'done',
        element: <Done />
      },
    ],
  },
])
