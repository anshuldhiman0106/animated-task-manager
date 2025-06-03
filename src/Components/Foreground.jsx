import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Cards from "./Cards";
import { dataContext } from "../Data/Data";
import { motion } from "motion/react";
import { IoClose } from "react-icons/io5";

const Foreground = () => {
  const { data, setData } = React.useContext(dataContext);
  const ref = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ description: "", status: "Not Started" });

  const handleAddTask = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.description.trim() === "") return;
    setData([...data, formData]);
    setFormData({ description: "", status: "Not Started" });
    localStorage.setItem('taskData', JSON.stringify([...data, formData]));
    // Reset form and close it after submission
    setShowForm(false);
  };

    const closeform = () => {
    setShowForm(false);
  };

  return (
    <div
      ref={ref}
      className="relative top-0 left-0 z-[3] w-full h-full overflow-hidden p-2 flex flex-wrap gap-5"
    >
      <div
        onClick={handleAddTask}
        className="absolute top-4 rounded-full flex justify-between gap-4 items-center cursor-pointer right-6 bg-zinc-400/90 w-[fit-content] h-[fit-content] p-4"
      >
        <FaPlus size={22} className="hover:rotate-180 transition-transform duration-500" />
        Add Task
      </div>

      {showForm && (
  <motion.div
    drag
    dragConstraints={ref}
    className="relative flex-shrink-0 w-60 z-[100] h-72 rounded-[40px] overflow-hidden bg-zinc-900/90 text-zinc-300 flex flex-col gap-3"
  >
    <h1 className="text-2xl text-zinc-400 pt-4 font-bold text-center">New Task</h1>
    <div className="absolute right-5 top-5 text-zinc-300 hover:text-zinc-200 hover:rotate-180 transition-transform duration-200 cursor-pointer">
      <IoClose size={24} onClick={closeform} />
    </div>

    <form onSubmit={handleFormSubmit} className="flex px-4 flex-col gap-3 h-full pb-14">
      <textarea
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Enter task description"
        className="p-2 text-base rounded outline-0 bg-zinc-800 text-zinc-400 resize-none h-24"
        required
      />
      <select
        value={formData.status}
        onChange={(e) =>
          setFormData({ ...formData, status: e.target.value })
        }
        className="p-2 rounded text-base bg-zinc-800 text-zinc-400"
      >
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Submit button moved INSIDE the form */}
      <button
        type="submit"
        className="absolute bottom-0 left-0 w-full h-12 bg-green-500 text-black font-semibold py-2 rounded hover:bg-green-600"
      >
        Save Task
      </button>
    </form>
  </motion.div>
)}


      {data.map((task, index) => (
        <Cards data={task} index={index} key={index} reference={ref} />
      ))}
    </div>
  );
};

export default Foreground;
