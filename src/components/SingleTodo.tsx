import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";
interface Props {
  todo: Todo;
  todos: Todo[];
  completedTodos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}
const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [todoTitle, setTodoTitle] = useState(todo.todo_text);

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
    }
  }, [edit]);

  //HANDLERS
  const handleUpdate = (e: FormEvent) => {
    inputRef.current?.blur();
    e.preventDefault();
    setTodos(
      todos.map((t) => {
        if (t.id === todo.id) {
          return { ...t, todo_text: todoTitle };
        } else {
          return t;
        }
      })
    );
  };
  //   console.log(todos);
  const handleComplete = () => {
    setTodos(
      todos.map((t) => {
        if (t.id === todo.id) {
          return { ...t, isDone: !todo.isDone };
        } else {
          return t;
        }
      })
    );
  };

  const handleDelete = () => {
    setTodos(
      todos.filter((t) => {
        return t.id !== todo.id;
      })
    );
  };
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="w-[100%] p-3 text-lg rounded-lg bg-white flex items-center gap-1 cursor-pointer hover:shadow-xl hover:bg-gray-100"
          onSubmit={handleUpdate}
          style={{
            backgroundColor: todo.isDone ? "lightgray" : "white",
            opacity: todo.isDone ? 0.8 : 1,
          }}
        >
          {edit ? (
            <input
              ref={inputRef}
              type="text"
              value={todoTitle}
              readOnly={!edit}
              className="w-[80%] p-2"
              onChange={(e) => {
                setTodoTitle(e.target.value);
              }}
              onBlur={() => setEdit(false)}
            />
          ) : (
            <div
              className="w-[80%] break-words p-2"
              style={{
                textDecorationLine: todo.isDone ? "line-through" : "",
                backgroundColor: todo.isDone ? "lightgray" : "white",
              }}
            >
              {todoTitle}
            </div>
          )}

          <div className="w-[20%] flex items-center gap-1 justify-center">
            <input
              type="checkbox"
              checked={todo.isDone}
              className="w-[20px] h-[20px]"
              onChange={handleComplete}
            />
            <FiEdit
              className="cursor-pointer text-5xl  md:text-2xl"
              onClick={() => {
                if (!todo.isDone) {
                  setEdit(!edit);
                }
              }}
              style={{ cursor: todo.isDone ? "not-allowed" : "" }}
            />
            <AiOutlineDelete
              className="cursor-pointer text-5xl  md:text-2xl"
              onClick={handleDelete}
            />
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
