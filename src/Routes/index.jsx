import { createBrowserRouter } from "react-router-dom";
import Registation from "../pages/Registation";
import Login from "../pages/Login"
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registation",
    element: <Registation />,
  },
]);