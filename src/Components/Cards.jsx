import React, { use, useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "motion/react";
import { useDragControls } from "motion/react";
import { dataContext } from "../Data/Data.jsx";

const Cards = ({ data, index, reference }) => {
  const { setData } = React.useContext(dataContext);
  const controls = useDragControls();

  const nextStatus = (current) => {
    if (current === "Not Started") return "In Progress";
    if (current === "In Progress") return "Completed";
    return "Not Started";
  };

  const handleStatusToggle = () => {
    setData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, status: nextStatus(item.status) } : item
      )
    );
  };

  return (
    <motion.div
      drag
      dragControls={controls}
      whileDrag={{ scale: 1.1 }}
      dragElastic={0.4}
      dragMomentum={1000}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
      dragConstraints={reference}
      className="relative flex-shrink-0 w-60 h-72 rounded-[40px] overflow-hidden bg-zinc-900/90 flex-col text-center"
    >
      <h1 className="text-zinc-400 text-4xl px-4 pt-4 font-bold mb-8">{`Task ${index+1}`}</h1>
      <div className="absolute right-4 top-4 text-zinc-300 hover:text-zinc-200 hover:rotate-180 transition-transform duration-200 cursor-pointer">
        <IoClose size={24} onClick={() => setData(prev => {
          const updated = prev.filter((_, i) => i !== index);
          localStorage.setItem('taskData', JSON.stringify(updated));
          return updated;
        })} />
      </div>
      <p className="text-zinc-500 px-4 text-xl">{data.description}</p>

      {/* Click to toggle status */}
      <div
        onClick={handleStatusToggle}
        className={`absolute bottom-0 w-full mt-5 h-12 cursor-pointer ${
          data.status === "Completed"
            ? "bg-green-500/90"
            : data.status === "In Progress"
            ? "bg-yellow-400/90"
            : "bg-red-500/90"
        }`}
      >
        <div className="flex items-center justify-center h-full">
          <span className="text-zinc-900 font-semibold">{data.status}</span>
        </div>
      </div>
    </motion.div>


  );
};

export default Cards;
