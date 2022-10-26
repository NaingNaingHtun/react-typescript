import React from "react";
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: (e: React.FormEvent) => void;
}
const InputField: React.FC<Props> = ({ todo, setTodo, handleAddTodo }) => {
  return (
    <form
      className="w-[90%] md:w-[40%] flex justify-center items-center bg-white rounded-xl p-2 drop-shadow-lg"
      onSubmit={handleAddTodo}
    >
      <input
        type="text"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        placeholder="Enter a task"
        className="w-[100%] p-2 outline-none rounded-lg text-lg "
      />
      <input
        type="submit"
        name="submit"
        value="Go"
        className="w-[50px] h-[50px] rounded-xl text-white bg-[#74b9e8] cursor-pointer active:scale-[0.8] transition-transform hover:bg-[#88c8f4 shadow-2xl font-bold"
        onClick={handleAddTodo}
      />
    </form>
  );
};

export default InputField;
