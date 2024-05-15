import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = ({setSearch, search}) => {

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div className="flex justify-center w-72 h-16 md:w-[600px] xl:w-[1150px] rounded-full self-center mt-8">
      <FaSearch className=' w-6 h-6 z-10 flex absolute mt-5 mr-56 md:mr-[530px] xl:mr-[1080px]' color='#acb0bd'/>
      <input
        className="bg-white w-72 md:w-[600px] xl:w-[1150px] h-16 self-center rounded-full drop-shadow-lg pr-6 pl-16 outline-none text-md placeholder-[#acb0bd]"
        type="text"
        placeholder="Search for course"
        value={search}
        onChange={handleSearch}
      ></input>
    </div>
  );
};

export default Searchbar;
