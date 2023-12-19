import {
  Page,
  Stack,
  Button,
  ResourceItem,
  Badge,
  Card,
  ResourceList,
  TextField,
  Form,
} from "@shopify/polaris";
import { useState } from "react";
import { todoApi } from "../../helpers/api/todoApi";
import useGetData from "../../hooks/useGetData";
import EmptyStateComponent from "../EmtyState/EmptyState";
import useModal from "../../hooks/useModal";

function TodoList() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [err, setErr] = useState(false);
  const {
    data: todos,
    setData: setTodos,
    loading,
    fetchData,
  } = useGetData("http://localhost:5000/api/todos");

  const cancelAction = () => {
    setTodoInput((prev) => (prev = ""));
    setErr(false);
  };

  const confirmAction = () => {
    if (!todoInput) {
      setErr(true);
      return false;
    }
    setErr(false);
    setTodoInput((prev) => (prev = ""));
    addTodo({ text: todoInput });
    return true;
  };

  const { openModal, modal } = useModal({
    content: (
      <TextField
        error={err && "You must enter a todo"}
        placeholder="Enter your todo"
        value={todoInput}
        onChange={setTodoInput}
        autoComplete="off"
      />
    ),
    cancelAction,
    confirmAction,
  });

  const addTodo = async (todo) => {
    try {
      await todoApi.createTodo(todo);
      const data = [...todos, todo];
      setTodos(data);
      setTimeout(() => fetchData(), 300);
    } catch (e) {
      console.log(e);
    }
  };

  const updateTodos = async (arrIds, isComplete) => {
    try {
      await todoApi.updateTodos({ arrIds, isComplete });
      const data = todos.map((todo) => {
        if (arrIds.includes(todo.id)) {
          isComplete
            ? (todo.isCompleted = true)
            : (todo.isCompleted = !todo.isCompleted);
        }
        return todo;
      });

      setTodos(data);
      setSelectedItems((prev) => (prev = []));
    } catch (e) {
      console.log(e);
    }
  };

  const removeTodos = async (arrIds) => {
    try {
      await todoApi.deleteTodos({ arrIds });
      const data = todos.filter((todo) => !arrIds.includes(todo.id));
      setTodos((prev) => (prev = [...data]));
      setSelectedItems((prev) => (prev = []));
    } catch (e) {
      console.log(e);
    }
  };

  const promotedBulkActions = [
    {
      content: "Complete",
      onAction: () => updateTodos(selectedItems, true),
    },
    {
      content: "Delete",
      onAction: () => removeTodos(selectedItems),
    },
  ];

  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  return (
    <Page
      title="Todoes"
      primaryAction={
        <Button primary onClick={openModal}>
          Create Todo
        </Button>
      }
    >
      {modal}
      <Stack vertical>
        <Stack
          alignment="center"
          distribution="equalSpacing"
          spacing="tight"
        ></Stack>
        <Card>
          <ResourceList
            resourceName={resourceName}
            emptyState={
              <EmptyStateComponent
                heading={"You do not have any todos"}
                title={"Enter todos to manage them"}
              />
            }
            promotedBulkActions={promotedBulkActions}
            loading={loading}
            items={todos}
            renderItem={TodoItem}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            selectable
          />
        </Card>
      </Stack>
    </Page>
  );

  function TodoItem(todo) {
    const { id, isCompleted, text } = todo;
    return (
      <ResourceItem id={id}>
        <Stack distribution="equalSpacing" alignment="center" spacing="loose">
          <Stack.Item fill>
            <h2>{text}</h2>
          </Stack.Item>
          <Stack.Item>
            <Badge status={isCompleted && "success"}>
              {isCompleted ? "Done" : "Pending"}
            </Badge>
          </Stack.Item>
          <Stack.Item>
            <Button onClick={() => updateTodos(id, false)}>
              {isCompleted ? "Uncomplete" : "Complete"}
            </Button>
          </Stack.Item>
          <Stack.Item>
            <Button onClick={() => removeTodos(id)} destructive>
              Delete
            </Button>
          </Stack.Item>
        </Stack>
      </ResourceItem>
    );
  }
}

export default TodoList;
