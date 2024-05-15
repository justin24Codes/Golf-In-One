import { useState, useEffect } from "react";

const HolesSelector = ({ holes }) => {
  const [selected, setSelected] = useState('18');

  const selectHoles = (numHoles) => {
    holes(numHoles);
    setSelected(numHoles);
  };

  return (
      <div
        className={`w-64 sm:w-96 h-12 bg-white border border-gray-400 rounded-md mb-4`}
      >
        <button
          onClick={() => selectHoles("18")}
          className={
            "w-1/3 h-full " +
            (selected === "18" &&
              "border bg-golf/20 border-golf rounded-l-md")
          }
        >
          18
        </button>
        <button
          onClick={() => selectHoles("Front 9")}
          className={
            "w-1/3 h-full " +
            (selected === "Front 9" && "border-golf border bg-golf/20")
          }
        >
          Front 9
        </button>
        <button
          onClick={() => selectHoles("Back 9")}
          className={
            "w-1/3 h-full " +
            (selected === "Back 9" &&
              "border-golf border bg-golf/20 rounded-r-md ")
          }
        >
          Back 9
        </button>
      </div>
  );
};

export default HolesSelector;
