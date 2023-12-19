import axios from "axios";

const config = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const todoApi = {
  getAllTodos: () => config.get("/todos"),
  createTodo: (params) => config.post("/todo", params),
  updateTodos: (params) => config.put(`/todos`, params),
  deleteTodos: (params) => config.delete(`/todos`, { data: params }),
};
