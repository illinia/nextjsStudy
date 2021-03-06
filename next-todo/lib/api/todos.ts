import axios from ".";
import { TodoType, AddTodoAPIBody } from "../../types/todo";

export const getTodosAPI = () => axios.get<TodoType[]>("api/todos");
export const checkTodoAPI = (id: number) => axios.patch(`api/todos/${id}`);
export const addtodoAPI = (body: AddTodoAPIBody) =>
  axios.post("/api/todos", body);
export const deleteTodoAPI = (id: number) => axios.delete(`/api/todos/${id}`);
