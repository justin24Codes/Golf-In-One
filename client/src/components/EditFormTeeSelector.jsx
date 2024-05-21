import { useState, useEffect } from "react";

const EditFormTeeSelector = ({ tees, select, defaultValue, id }) => {
  const [selectedTee, setSelectedTee] = useState("");
  const selection = (e) => {
    setSelectedTee(e.target.value);
    select(e.target.value);
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedTee(defaultValue);
    }
  }, [defaultValue, id]);

  return (
    <select
      className="w-64 sm:w-96 h-12 mb-4 bg-white rounded-md outline-none px-2 focus:border-golf border border-gray-400 focus:shadow-md shadow-golf"
      onChange={selection}
      value={selectedTee}
    >
      {tees.map((tee) => (
        <option key={tee[1]} value={tee[2]}>
          {tee[0]}
        </option>
      ))}
    </select>
  );
};

export default EditFormTeeSelector;
