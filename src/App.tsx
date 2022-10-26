import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import InputField from "./components/InputField";
import TodosList from "./components/TodosList";
import { Todo } from "./model";
const App: React.FC = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  //HANDLERS
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      //only if we have a value for todo
      setTodos([...todos, { id: Date.now(), todo_text: todo, isDone: false }]); //add new doto
      setTodo(""); //clear the input field
    }
  };

  const handleDragEnd = (result: DropResult) => {
    console.log(result);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="bg-[#74b9e8] w-[100vw] h-[100vh] flex flex-col items-center">
        <h1 className="text-white font-extrabold text-5xl my-[30px]">
          Todo List
        </h1>
        <InputField
          todo={todo}
          setTodo={setTodo}
          handleAddTodo={handleAddTodo}
        />
        <TodosList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
