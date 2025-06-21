import {
  selectChannels,
  useEditChannelMutation,
} from "@/features/channelsSlice";
import { useFormik } from "formik";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

export const RenameChannelModal = ({ show, onHide, channel }) => {
  const [editChannel, { isLoading: isEditChannelLoading }] =
    useEditChannelMutation();
  const channels = useSelector(selectChannels);

  const formik = useFormik({
    initialValues: { name: channel.name },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, "От 3 до 20 символов")
        .max(20, "От 3 до 20 символов")
        .required("Обязательное поле")
        .notOneOf(
          channels.map((channel) => channel.name),
          "Должно быть уникальным"
        ),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: ({ name }, { setSubmitting, resetForm }) => {
      editChannel({ name, id: channel.id })
        .then(() => {
          onHide();
          resetForm();
          toast.success("Канал переименован");
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const handleHide = () => {
    onHide();
    formik.resetForm();
  };

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            type="text"
            autoFocus
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.name}
            className="mb-2"
            disabled={isEditChannelLoading}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-2"
              onClick={handleHide}
              disabled={isEditChannelLoading}
            >
              Отменить
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isEditChannelLoading}
            >
              {isEditChannelLoading ? (
                <Spinner variant="secondary" animation="border" size="sm" />
              ) : (
                "Отправить"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
