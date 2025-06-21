import { useRemoveChannelMutation } from "@/features/channelsSlice";
import { Button, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export const RemoveChannelModal = ({ show, onHide, channelId }) => {
  const [removeChannel, { isLoading: isRemoveChannelLoading }] =
    useRemoveChannelMutation();

  const handleRemove = () => {
    removeChannel({ id: channelId }).then(() => {
      onHide();
      toast.success("Канал удалён");
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={onHide}
            disabled={isRemoveChannelLoading}
          >
            Отменить
          </Button>
          <Button
            variant="danger"
            type="submit"
            disabled={isRemoveChannelLoading}
            onClick={handleRemove}
          >
            {isRemoveChannelLoading ? (
              <Spinner variant="secondary" animation="border" size="sm" />
            ) : (
              "Удалить"
            )}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
