import { Modal, TextField, Form } from "@shopify/polaris";
import { useState } from "react";

function TodoModal({ active, closeModal, addTodo }) {
  const [todo, setTodo] = useState("");
  const [err, setErr] = useState(false);

  const handleSubmit = () => {
    if (!todo.trim()) {
      setErr(true);
      return;
    }
    addTodo({ text: todo });
    closeModal();
    setTodo((todo) => (todo = ""));
    setErr(false);
  };

  const handleCancel = () => {
    closeModal();
    setTodo((todo) => (todo = ""));
    setErr(false);
  };

  return (
    <Modal
      open={active}
      onClose={handleCancel}
      title="Create a new todo"
      primaryAction={{
        content: "Create",
        onAction: handleSubmit,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleCancel,
        },
      ]}
    >
      <Modal.Section>
        <Form onSubmit={handleSubmit}>
          <TextField
            error={err && "You must enter a todo"}
            placeholder="Enter your todo"
            value={todo}
            onChange={setTodo}
            autoComplete="off"
          />
        </Form>
      </Modal.Section>
    </Modal>
  );
}

export default TodoModal;
