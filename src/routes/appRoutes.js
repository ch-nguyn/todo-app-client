import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import TodoList from "../components/Todo/TodoList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/home" element={<TodoList />} />
      </Route>
      <Route path="*" element={<Navigate to={"/home"} />} />
    </>
  )
);

export default router;
