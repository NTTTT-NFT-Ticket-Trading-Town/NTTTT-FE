import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Layout from "./layout/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "",
        async lazy() {
          const index = await import("./pages/Home");
          return { Component: index.default };
        },
      },
      {
        path: "login",
        async lazy() {
          const index = await import("./pages/Login");
          return { Component: index.default };
        },
      },
      {
        path: "signup",
        async lazy() {
          const index = await import("./pages/Signup");
          return { Component: index.default };
        },
      },
      {
        path: "gacha",
        async lazy() {
          const index = await import("./pages/Gacha");
          return { Component: index.default };
        },
      },
      {
        path: "artists",
        async lazy() {
          const index = await import("./pages/Artists");
          return { Component: index.default };
        },
      },
      {
        path: "buy",
        async lazy() {
          const index = await import("./pages/Buy");
          return { Component: index.default };
        },
      },
      {
        path: "mypage",
        async lazy() {
          const index = await import("./pages/MyPage");
          return { Component: index.default };
        },
      },
      {
        path: "test",
        async lazy() {
          const index = await import("./pages/Test");
          return { Component: index.default };
        },
      },
      {
        path: "*",
        async lazy() {
          const index = await import("./pages/NotFound");
          return { Component: index.default };
        },
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
