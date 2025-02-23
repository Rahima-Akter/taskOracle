import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import AddTaskForm from '../components/AddTaskForm'
import Home from '../components/Home'
import PrivateRoute from '../routes/PrivateRoute'
import UpdateTask from '../components/UpdateTask'
import Tasks from '../components/Tasks'

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
        
        element: <Tasks />
      },
      {
        path: 'create-task',
        element: <AddTaskForm />
      },
      {
        path: 'update/:id',
        element: <UpdateTask />,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`http://localhost:9000/task-by-id/${params.id}`)
            const data = await response.json()
            return data
          } catch (error) {
            console.log(error)
            return {}
          }
        }
      },
    ],
  },
])
