import { Outlet, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Button } from "react-bootstrap";

import { logout, selectUser } from "./features/authSlice";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

export const AppLayout = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
              {t("logout")}
            </Button>
          )}
        </Container>
      </Navbar>
      <Outlet />
      <ToastContainer />
    </div>
  );
};
