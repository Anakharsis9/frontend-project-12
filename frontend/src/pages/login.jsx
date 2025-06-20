import { Formik, Form, Field } from "formik";

export const LoginPage = () => {
  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={() => {
          // TODO: handle me
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="username" />
            <Field type="password" name="password" />
            <button type="submit" disabled={isSubmitting}>
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
