import { useRemoveChannelMutation } from '@/features/channelsSlice'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export const RemoveChannelModal = ({ show, onHide, channelId }) => {
  const { t } = useTranslation()
  const [removeChannel, { isLoading: isRemoveChannelLoading }]
    = useRemoveChannelMutation()

  const handleRemove = () => {
    removeChannel({ id: channelId }).then(() => {
      onHide()
      toast.success(t('channels.remove.successMessage'))
    })
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('channels.remove.hint')}</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={onHide}
            disabled={isRemoveChannelLoading}
          >
            {t('common.actions.cancel')}
          </Button>
          <Button
            variant="danger"
            type="submit"
            disabled={isRemoveChannelLoading}
            onClick={handleRemove}
          >
            {isRemoveChannelLoading
              ? (
                  <Spinner variant="secondary" animation="border" size="sm" />
                )
              : (
                  t('channels.remove.action')
                )}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
