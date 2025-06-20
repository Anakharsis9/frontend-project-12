import { useFormik } from "formik";
import { useNavigate, Link } from "react-router";
import {
  FloatingLabel,
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";

import { login } from "../../features/authSlice";
import formImageSrc from "./form-image.jpg";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: ({ username, password }, { setSubmitting, setErrors }) => {
      axios
        .post("/api/v1/login", { username, password })
        .then((response) => {
          dispatch(login(response.data.token));
          navigate("/");
        })
        .catch((err) => {
          if (err?.response.data?.error?.includes("Unauthorized")) {
            setErrors({
              username: "Unauthorized",
              password: "Неверные имя пользователя или пароль",
            });
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col
                xs={12}
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <img
                  src={formImageSrc}
                  alt="Войти"
                  className="rounded-circle"
                />
              </Col>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-md-0"
              >
                <h1 className="text-center mb-4">Войти</h1>
                <FloatingLabel label="Ваш ник" className="mb-3">
                  <Form.Control
                    type="text"
                    name="username"
                    autoComplete="username"
                    className="form-control"
                    placeholder="Ваш ник"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!formik.errors.username}
                  />
                </FloatingLabel>
                <FloatingLabel label="Пароль" className="mb-4">
                  <Form.Control
                    type="password"
                    name="password"
                    autoComplete="password"
                    className="form-control"
                    placeholder="Пароль"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  variant="outline-primary"
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-100 mb-3"
                >
                  Войти
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div class="text-center">
                <span>Нет аккаунта?</span> <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
