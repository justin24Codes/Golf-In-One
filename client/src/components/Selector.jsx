import { useState, useEffect } from "react";

const Selector = ({ data, select, setCourse, defaultValue = 'hi' }) => {

  const selection = (e) => {
    if (setCourse) {
      setCourse(e.target.value);
    }
    select(e.target.value)
  }

  return (
    <select
      // name="selector"
      className="w-64 sm:w-96 h-12 mb-4 bg-gray-200 rounded-md outline-none px-2 focus:border-golf border-2"
      onChange={selection}
      // value={course}
      defaultValue='testing'
    >
      {data.map((item) => (
        <option key={item[1]} value={item[1]}>{item[0]}</option>
      ))}
    </select>
  );
};

export default Selector;
