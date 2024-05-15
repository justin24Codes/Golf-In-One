import { getAllRounds } from "../services/Rounds.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import NewRoundForm from "../components/NewRoundForm.jsx";
import EditRound from "../components/EditRound.jsx";
import PageTitle from "../components/PageTitle.jsx";
import Round from "../components/Round.jsx";

const Rounds = () => {
  const [rounds, setRounds] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);

  const onOpenForm = () => {
    setFormOpen(true);
  };

  const onCloseForm = () => {
    setFormOpen(false);
  };

  useEffect(() => {
    const getRounds = async () => {
      try {
        const res = await getAllRounds();
        setRounds(res.data);
        console.log(res.data)
      } catch (e) {
        console.log(e);
      }
    };
    getRounds();
  }, []);

  return (
    <div className="flex flex-col content-end justify-items-end font-noto-sans top-0">
      <div className="flex flex-col items-center">
        <PageTitle title="Rounds" />
        {/* {rounds.map((round) => (
          <Round key={round._id} score={round.score}/>
        ))} */}
        <table className="w-11/12 mt-6 border-collapse drop-shadow-lg shadow-md rounded-xl">
          <thead className="h-16 border-b-2 border-slate-400">
            <tr className="text-left">
              <th className="px-2 bg-slate-200 rounded-tl-xl">Score</th>
              <th className="px-2 bg-slate-200">Course</th>
              <th className="px-2 hidden sm:table-cell bg-slate-200 ">Holes</th>
              <th className="px-2 hidden md:table-cell bg-slate-200 ">Date</th>
              <th className="px-2 hidden lg:table-cell bg-slate-200">Tee</th>
              <th className="px-2 hidden xl:table-cell bg-slate-200">
                Handicap Differential
              </th>
              <th className="px-2 bg-slate-200"></th>
              <th className="px-2 bg-slate-200 rounded-tr-xl"></th>
            </tr>
          </thead>
          <tbody className="rounded-b-lg">
            {rounds.map((round, index) => (
              <tr
                className={`h-14 border-slate-300 border-b ${
                  index + 1 == rounds.length && "border-none"
                }`}
                key={index}
              >
                <td
                  className={`px-2 text-2xl font-semibold text-golf rounded-bl-lg bg-white ${
                    index + 1 != rounds.length && "rounded-bl-none"
                  }`}
                >
                  {round.score}
                </td>
                <td className="px-2 bg-white">
                  {/* {round.course} */}
                  TPC Toronto at Ospre Valley - Heathlands
                </td>
                <td className="px-2 bg-white hidden sm:table-cell">
                  {round.numHoles}
                </td>
                <td className="px-2 bg-white hidden md:table-cell">
                  {/* Needs to be updated */}
                  {round.date.slice(0, 10)}
                </td>
                <td className="px-2 bg-white hidden lg:table-cell">
                  {round.tee}
                </td>
                <td className="px-2 hidden xl:table-cell bg-white">
                  {/* Needs Updating */}
                  +4.5
                </td>
                <td className="bg-white">
                  <button
                    onClick={() => setEditFormOpen(true)}
                    className="w-7 h-7 hover:bg-slate-200 rounded-md flex items-center justify-center"
                  >
                    <FiEdit className="w-5 h-5" color="black" />
                  </button>
                </td>
                <td
                  className={`bg-white ${
                    index + 1 == rounds.length && "rounded-br-xl"
                  }`}
                >
                  <div className="w-7 h-7 hover:bg-red-100 rounded-md flex items-center justify-center">
                    <RiDeleteBin6Line className="w-5 h-5" color="red" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="bg-golf w-48 h-12 shadow-md shadow-gray-400 text-white absolute bottom-8 right-8 rounded-2xl hover:brightness-75 transition duration-300 active:-translate-y-1"
        onClick={onOpenForm}
      >
        Add Round
      </button>
      {/* <EditRound onClose={() => setEditFormOpen(false)} open={editFormOpen} /> */}
      <NewRoundForm onClose={onCloseForm} open={formOpen} />
    </div>
  );
};

export default Rounds;
