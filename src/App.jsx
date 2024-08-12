
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UserContextProvider from './Context/UserContext';
import NotFound from './components/NotFound/NotFound';
const routes = createBrowserRouter([
  {
    path: "",
    element: 
      <ProtectedRoute>
      <Layout />
    </ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Register /> },
  {path:'*',element:<NotFound/>}
]);

function App() {

  return (
    <UserContextProvider>
 <RouterProvider router={routes}/>
    </UserContextProvider>
   

  );
}

export default App;
