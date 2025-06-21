import { useFormik } from "formik";
import { useNavigate } from "react-router";
import {
  FloatingLabel,
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import * as Yup from "yup";

import { useSignupMutation } from "@/features/authSlice";
// @ts-ignore
import formImageSrc from "./form-image.jpg";
import { useTranslation } from "react-i18next";

export const SignupPage = () => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { username: "", password: "", confirmPassword: "" },
    validateOnBlur: false,
    validateOnChange: true,
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, t("common.errors.identityLength"))
        .max(20, t("common.errors.identityLength"))
        .required(t("common.errors.required")),
      password: Yup.string()
        .min(6, t("signup.errors.passwordLength"))
        .required(t("common.errors.required")),
      confirmPassword: Yup.string().equals(
        [Yup.ref("password")],
        t("signup.errors.passwordMatch")
      ),
    }),
    onSubmit: ({ username, password }, { setErrors }) => {
      signup({ username, password })
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((response) => {
          if (response?.data?.error?.includes("Conflict")) {
            setErrors({
              username: t("signup.errors.conflict"),
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
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <img
                src={formImageSrc}
                alt={t("signup.title")}
                className="rounded-circle"
              />
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t("signup.title")}</h1>
                <FloatingLabel
                  label={t("signup.labels.username")}
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="username"
                    autoComplete="username"
                    className="form-control"
                    placeholder={t("signup.labels.username")}
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
                <FloatingLabel
                  label={t("signup.labels.password")}
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    autoComplete="password"
                    className="form-control"
                    placeholder={t("signup.labels.password")}
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
                <FloatingLabel
                  label={t("signup.labels.confirmPassword")}
                  className="mb-4"
                >
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder={t("signup.labels.confirmPassword")}
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
                  disabled={isLoading}
                  className="w-100"
                >
                  {t("signup.labels.action")}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
