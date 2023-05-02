import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Gacha from "./pages/Gacha";
import Artists from "./pages/Artists"
import Layout from "./layout/Layout";
import Test from "./pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "gacha",
        element: <Gacha />,
      },
      {
        path: "artists",
        element: <Artists />,
      },
      {
        path: "test",
        element: <Test />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
