import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import AddTaskForm from '../components/AddTaskForm'
import Todo from '../components/Category/Todo'
import Done from '../components/Category/Done'
import Progress from '../components/Category/Progress'
import Home from '../components/Home'
import PrivateRoute from '../routes/PrivateRoute'
import UpdateTask from '../components/UpdateTask'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'dashboard',
    element: <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>,
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
      {
        path: 'update/:id',
        element: <UpdateTask/>,
        loader: ({params})=> fetch(`http://localhost:9000/task-by-id/${params.id}`)
      },
    ],
  },
])
