import {
  selectChannels,
  useEditChannelMutation,
} from '@/features/channelsSlice'
import { useFormik } from 'formik'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export const RenameChannelModal = ({ show, onHide, channel }) => {
  const { t } = useTranslation()
  const [editChannel, { isLoading: isEditChannelLoading }]
    = useEditChannelMutation()
  const channels = useSelector(selectChannels)

  const formik = useFormik({
    initialValues: { name: channel.name },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, t('common.errors.identityLength'))
        .max(20, t('common.errors.identityLength'))
        .required(t('common.errors.required'))
        .notOneOf(
          channels.map(channel => channel.name),
          t('common.errors.uniqueName'),
        ),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: ({ name }, { resetForm }) => {
      editChannel({ name, id: channel.id }).then(() => {
        onHide()
        resetForm()
        toast.success(t('channels.rename.successMessage'))
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
        <Modal.Title>{t('channels.rename.title')}</Modal.Title>
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
            disabled={isEditChannelLoading}
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
              disabled={isEditChannelLoading}
            >
              {t('common.actions.cancel')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isEditChannelLoading}
            >
              {isEditChannelLoading
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
