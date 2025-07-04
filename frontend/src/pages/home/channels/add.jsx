import {
  selectChannels,
  switchActiveChannel,
  useAddChannelMutation,
} from '@/features/channelsSlice'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const AddNewChannelModal = ({ show, onHide }) => {
  const { t } = useTranslation()
  const [addChannel, { isLoading: isAddChannelLoading }]
    = useAddChannelMutation()
  const channels = useSelector(selectChannels)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, t('common.errors.identityLength'))
        .max(20, t('common.errors.identityLength'))
        .required(t('common.errors.required'))
        .notOneOf(
          channels.map(channel => channel.name),
          t('channels.add.errors.uniqueName'),
        ),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: ({ name }, { resetForm }) => {
      addChannel({ name }).then(({ data }) => {
        onHide()
        resetForm()
        dispatch(switchActiveChannel(data.id))
        toast.success(t('channels.add.successMessage'))
      })
    },
  })

  const handleHide = () => {
    onHide()
    formik.resetForm()
  }

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            id="name"
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
          <label htmlFor="name" className="visually-hidden">
            {t('channels.add.aria')}
          </label>
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
              {t('common.actions.cancel')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isAddChannelLoading}
            >
              {isAddChannelLoading
                ? (
                    <Spinner variant="secondary" animation="border" size="sm" />
                  )
                : (
                    t('common.actions.send')
                  )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export const AddNewChannelButton = () => {
  const [show, setShow] = useState(false)

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
  )
}
