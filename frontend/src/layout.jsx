import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <div>
      <nav></nav>
      <Outlet />
    </div>
  );
};
