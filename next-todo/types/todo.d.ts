export type TodoType = {
  id: number;
  text: string;
  color: "red" | "orange" | "yellow" | "green" | "blue" | "navy";
  checked: boolean;
};

export interface IProps {
  todos: TodoType[];
}

export interface AddTodoAPIBody {
  text: string;
  color: TodoType["color"];
}
