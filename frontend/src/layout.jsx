import { Outlet, useNavigate } from "react-router";

export const AppLayout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Выйти
        </button>
      </nav>
      <Outlet />
    </div>
  );
};
