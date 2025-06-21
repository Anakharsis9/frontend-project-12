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

import { useLoginMutation } from "@/features/authSlice";
// @ts-ignore
import formImageSrc from "./form-image.jpg";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: ({ username, password }, { setErrors }) => {
      login({ username, password })
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((response) => {
          if (response?.data?.error?.includes("Unauthorized")) {
            setErrors({
              username: "Unauthorized",
              password: t("login.errors.unauthorized"),
            });
          }
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
                  alt={t("login.title")}
                  className="rounded-circle"
                />
              </Col>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-md-0"
              >
                <h1 className="text-center mb-4">{t("login.title")}</h1>
                <FloatingLabel
                  label={t("login.labels.username")}
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="username"
                    autoComplete="username"
                    className="form-control"
                    placeholder={t("login.labels.username")}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!formik.errors.username}
                  />
                </FloatingLabel>
                <FloatingLabel
                  label={t("login.labels.password")}
                  className="mb-4"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    autoComplete="password"
                    className="form-control"
                    placeholder={t("login.labels.password")}
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
                  disabled={isLoading}
                  className="w-100 mb-3"
                >
                  {t("login.labels.action")}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                {t("login.signup.hint")}{" "}
                <Link to="/signup">{t("login.signup.link")}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
