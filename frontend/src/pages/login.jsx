import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { FloatingLabel, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";

import { login } from "../features/authSlice";

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

  console.log(formik.errors);

  return (
    <div>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          label="Ваш ник"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="username"
            className="form-control"
            placeholder="Ваш ник"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.username}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Пароль"
          className="mb-4"
        >
          <Form.Control
            type="password"
            name="password"
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
        >
          Войти
        </Button>
      </Form>
    </div>
  );
};
