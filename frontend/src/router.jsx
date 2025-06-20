import { createBrowserRouter, replace } from "react-router";
import { AppLayout } from "./layout";

import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { NotFoundPage } from "./pages/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: () => {
          const token = localStorage.getItem("token");
          if (!token) {
            return replace("/login");
          }
          return { token };
        },
      },
      {
        path: "/login",
        element: <LoginPage />,
        loader: () => {
          const token = localStorage.getItem("token");
          if (token) {
            return replace("/");
          }
          return { token };
        },
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
