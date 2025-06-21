import {
  selectChannels,
  switchActiveChannel,
  useAddChannelMutation,
} from "@/features/channelsSlice";
import { useFormik } from "formik";
import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const AddNewChannelModal = ({ show, onHide }) => {
  const [addChannel, { isLoading: isAddChannelLoading }] =
    useAddChannelMutation();
  const channels = useSelector(selectChannels);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { name: "" },
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
    onSubmit: async ({ name }, { setSubmitting, resetForm }) => {
      addChannel({ name })
        .then(({ data }) => {
          dispatch(switchActiveChannel(data.id));
        })
        .finally(() => {
          onHide();
          resetForm();
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
        <Modal.Title>Добавить канал</Modal.Title>
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
            disabled={isAddChannelLoading}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-2"
              onClick={handleHide}
              disabled={isAddChannelLoading}
            >
              Отменить
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isAddChannelLoading}
            >
              {isAddChannelLoading ? (
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

export const AddNewChannelButton = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        className="p-0 text-primary btn btn-group-vertical"
        onClick={() => setShow(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-plus-square"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
        </svg>
        <span className="visually-hidden">+</span>
      </button>
      <AddNewChannelModal show={show} onHide={() => setShow(false)} />
    </>
  );
};
