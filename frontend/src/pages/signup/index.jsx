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
import * as Yup from "yup";

import { login } from "@/features/authSlice";
// @ts-ignore
import formImageSrc from "./form-image.jpg";
import { apiInstance } from "@/api";

export const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { username: "", password: "", confirmPassword: "" },
    validateOnBlur: false,
    validateOnChange: true,
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, "От 3 до 20 символов")
        .max(20, "От 3 до 20 символов")
        .required("Обязательное поле"),
      password: Yup.string()
        .min(6, "Не менее 6 символов")
        .required("Обязательное поле"),
      confirmPassword: Yup.string().equals(
        [Yup.ref("password")],
        "Пароли должны совпадать"
      ),
    }),
    onSubmit: ({ username, password }, { setErrors }) => {},
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <img src={formImageSrc} alt="Войти" className="rounded-circle" />
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <FloatingLabel label="Имя пользователя" className="mb-3">
                  <Form.Control
                    type="text"
                    name="username"
                    autoComplete="username"
                    className="form-control"
                    placeholder="Имя пользователя"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      !!formik.errors.username && formik.touched.username
                    }
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel label="Пароль" className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    autoComplete="password"
                    className="form-control"
                    placeholder="Пароль"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      !!formik.errors.password && formik.touched.password
                    }
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel label="Подтвердите пароль" className="mb-4">
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Подтвердите пароль"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      !!formik.errors.confirmPassword &&
                      formik.touched.confirmPassword
                    }
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  variant="outline-primary"
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-100"
                >
                  Зарегистрироваться
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
