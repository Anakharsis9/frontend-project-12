import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router";
import { FloatingLabel } from "react-bootstrap";
import axios from "axios";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={({ username, password }, { setSubmitting }) => {
          axios
            .post("/api/v1/login", { username, password })
            .then((response) => {
              localStorage.setItem("token", response.data.token);
              navigate("/");
            })
            .catch((err) => {
              console.log(err.response.data);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Ваш ник"
              className="mb-3"
            >
              <Field
                type="text"
                name="username"
                className="form-control"
                placeholder="Ваш ник"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Пароль">
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Пароль"
              />
            </FloatingLabel>
            <button type="submit" disabled={isSubmitting}>
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
