import { Outlet, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./features/authSlice";

export const AppLayout = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <div>
      <nav>
        {token && (
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            Выйти
          </button>
        )}
      </nav>
      <Outlet />
    </div>
  );
};
