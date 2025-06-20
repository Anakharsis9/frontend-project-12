import { createBrowserRouter } from "react-router";
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
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
