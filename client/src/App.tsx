import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.js';
import { Provider } from './components/ui/provider';
import Errors from './pages/Errors.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Errors />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <Errors />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Errors />,
    },
    {
      path: "/dashboard/:id",
      element: <Dashboard />,
      errorElement: <Errors />,
    }
  ]);

  return(
  <>
    <Provider>
    <RouterProvider router={router}/>
    </Provider>
  </>
  );
};

export default App;