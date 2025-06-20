import { createBrowserRouter, replace } from "react-router";
import { AppLayout } from "./layout";
import { store } from "./store";

import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";
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
          const state = store.getState();
          const token = state.auth.token;
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
          const state = store.getState();
          const token = state.auth.token;
          if (token) {
            return replace("/");
          }
          return { token };
        },
      },
      {
        path: "/signup",
        element: <SignupPage />,
        loader: () => {
          const state = store.getState();
          const token = state.auth.token;
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
