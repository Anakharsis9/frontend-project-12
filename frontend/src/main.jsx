import "bootstrap/dist/css/bootstrap.min.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";

import { i18n } from "./i18n";
import { router } from "./router";
import { store } from "./store";
import { toast } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

window.addEventListener("online", () => {
  toast.info(i18n.t("common.errors.networkOnline"));
  toast.done("network-status");
});

window.addEventListener("offline", () => {
  toast.warn(i18n.t("common.errors.networkOffline"), {
    autoClose: false,
    toastId: "network-status",
  });
});
