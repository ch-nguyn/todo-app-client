import { useState, useRef } from "react";
import { Modal, Form, TextField } from "@shopify/polaris";

/**
 *
 * @param canCloseAfterFinished
 * @param large
 * @param buttonTitle
 * @param closeTitle
 * @param destructive
 * @param secondaryActions
 * @param cancelAction
 * @param confirmAction
 * @param content
 * @returns {{openModal: openModal, closeModal: closeModal, modal: JSX.Element, isActive: boolean}}
 */
function useModal({
  buttonTitle = "Create",
  closeTitle = "Cancel",
  destructive = false,
  secondaryActions = [],
  cancelAction = () => {},
  confirmAction = () => {},
  content,
  heading = "Create a new todo",
  closeAfterSubmit = true,
}) {
  const [isActive, setIsActive] = useState(false);
  const input = useRef(null);
  console.log(input);
  const openModal = () => {
    setIsActive(true);
  };

  const closeModal = () => {
    setIsActive(false);
  };

  const handleSubmit = () => {
    const res = confirmAction();
    if (res && closeAfterSubmit) {
      closeModal();
    }
  };

  const handleCancel = () => {
    cancelAction();
    closeModal();
  };

  const modal = (
    <Modal
      open={isActive}
      onClose={closeModal}
      title={heading}
      primaryAction={{
        content: buttonTitle,
        onAction: handleSubmit,
        destructive,
      }}
      secondaryActions={
        closeTitle !== ""
          ? [
              {
                content: closeTitle,
                onAction: handleCancel,
              },
            ]
          : secondaryActions
      }
    >
      <Modal.Section>
        <Form onSubmit={handleSubmit}>{content}</Form>
      </Modal.Section>
    </Modal>
  );

  return { modal, isActive, openModal, closeModal };
}

export default useModal;
