import { Outlet, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Button } from "react-bootstrap";

import { logout } from "./features/authSlice";

export const AppLayout = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <Navbar expand="lg" variant="light" bg="white" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          {user && (
            <Button
              variant="primary"
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
            >
              Выйти
            </Button>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};
