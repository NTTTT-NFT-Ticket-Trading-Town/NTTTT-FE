import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./home";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(<Route element={<Home />} path="/" />)
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
