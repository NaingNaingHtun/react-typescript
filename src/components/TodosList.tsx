import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
interface Props {
  todos: Todo[];
  completedTodos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodosList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="w-[90%] flex flex-col md:flex-row gap-1 mt-5">
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            className="flex-1 flex flex-col gap-2 p-2 bg-green-400 rounded-xl"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h1 className="text-2xl text-white">Active Tasks</h1>
            {todos.map((todo, index) => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
                completedTodos={completedTodos}
                setCompletedTodos={setCompletedTodos}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="completed">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex-1 flex flex-col gap-2 p-2 bg-red-400 rounded-xl"
          >
            <h1 className="text-2xl text-white">Completed Tasks</h1>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
                completedTodos={completedTodos}
                setCompletedTodos={setCompletedTodos}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodosList;
