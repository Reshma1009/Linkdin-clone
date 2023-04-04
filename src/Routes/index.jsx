import { createBrowserRouter } from "react-router-dom";
import Registation from "../pages/Registation";
import Login from "../pages/Login"
import ForgetPassword from "../pages/ForgetPassword";
import Home from "../pages/Home";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registation",
    element: <Registation />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/forgotpassword",
    element: <ForgetPassword />,
  },
]);