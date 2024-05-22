import { getAllRounds } from "../services/Rounds.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";

import NewRoundForm from "../components/NewRoundForm.jsx";
import EditRoundForm from "../components/EditRound.jsx";
import PageTitle from "../components/PageTitle.jsx";
import Round from "../components/Round.jsx";
import round from "../../../server/models/round.js";

const Rounds = () => {
  const [rounds, setRounds] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [roundId, setRoundId] = useState('123');
  const [refreshRounds, setRefreshRounds] = useState(false);
  const [date, setDate] = useState('');

  const onOpenForm = () => {
    setFormOpen(true);
  };

  const onCloseForm = () => {
    setFormOpen(false);
  };

  const deleteRound = async (id) => {
    try {
      setRefreshRounds(true);
      await axios.delete(`http://localhost:3000/rounds/${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  const openEditForm = (id) => {
    setEditFormOpen(true);
    setRoundId(id);
  };

  useEffect(() => {
    const getRounds = async () => {
      try {
        const res = await getAllRounds();
        setRounds(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    setRefreshRounds(false)
    getRounds();
    //Score Differential
    // const scoreDifferential = (113/)


  }, [refreshRounds]);

  return (
    <div className="flex flex-col content-end justify-items-end font-noto-sans top-0">
      <div className="flex flex-col items-center pb-8">
        <PageTitle title="Rounds" />
        <table className="w-11/12 mt-6 border-collapse drop-shadow-lg shadow-md rounded-xl">
          <thead className="h-16 border-b-2 border-stone-400">
            <tr className="text-left">
              <th className="px-2 bg-stone-200 rounded-tl-xl">Score</th>
              <th className="px-2 bg-stone-200">Course</th>
              <th className="px-2 hidden sm:table-cell bg-stone-200 ">Holes</th>
              <th className="px-2 hidden md:table-cell bg-stone-200 ">Date</th>
              <th className="px-2 hidden lg:table-cell bg-stone-200">Tee</th>
              <th className="px-2 hidden xl:table-cell bg-stone-200">
                Course Handicap
              </th>
              <th className="px-2 bg-stone-200"></th>
              <th className="px-2 bg-stone-200 rounded-tr-xl"></th>
            </tr>
          </thead>
          <tbody className="rounded-b-lg">
            {rounds.map((round, index) => (
              <tr
                className={`h-14 border-stone-300 border-b ${
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
                  {round.course}
                </td>
                <td className="px-2 bg-white hidden sm:table-cell">
                  {round.numHoles}
                </td>
                <td className="px-2 bg-white hidden md:table-cell">
                  {new Date(round.date).toLocaleDateString('en-CA')}
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
                    onClick={() => openEditForm(round._id)}
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
                  <button onClick={() => deleteRound(round._id)} className="w-7 h-7 hover:bg-red-100 rounded-md flex items-center justify-center">
                    <RiDeleteBin6Line className="w-5 h-5" color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="bg-golf w-48 h-12 shadow-md shadow-gray-400 text-white fixed bottom-8 right-8 rounded-2xl hover:brightness-75 transition duration-300 active:-translate-y-1"
        onClick={onOpenForm}
      >
        Add Round
      </button>
      <EditRoundForm onClose={() => setEditFormOpen(false)} open={editFormOpen} id={roundId} setRefreshRounds={setRefreshRounds}/>
      <NewRoundForm onClose={onCloseForm} open={formOpen} setRefreshRounds={setRefreshRounds}/>
    </div>
  );
};

export default Rounds;
