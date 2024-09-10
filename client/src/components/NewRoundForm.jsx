import { useState, useEffect } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import LargeScoreInput from "./LargeScoreInput.jsx";
import CourseSelector from "./CourseSelector.jsx";
import HolesSelector from "./HolesSelector.jsx";
import Course from "../../../server/models/course.js";
import TeeSelector from "./TeeSelector.jsx";

import { getAllCourses, getCourse } from "../services/Courses.js";
import { postRound } from "../services/Rounds.js";
import { IoCloseOutline } from "react-icons/io5";

const NewRoundForm = ({ onClose, open, setRefreshRounds }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseId, setCourseId] = useState("666536d8865e1ff622f7aca9");
  const [tee, setTee] = useState("");
  const [numHoles, setNumHoles] = useState("18");
  const [tees, setTees] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await getAllCourses();
        setCourses(res.data);
        setSelectedCourse(res.data[0].name);
        setTee(res.data[0].tees[0].colour);
      } catch (e) {
        console.log(e);
      }
    };
    getCourses();
  }, []);

  useEffect(() => {
    if (courseId) {
      const getTees = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3000/courses/${courseId}`
          );
          setTees(res.data.tees);
          setTee(res.data.tees[0].colour);
        } catch (e) {
          // console.log(e);
        }
      };
      getTees();
    }
  }, [courseId]);

  const postRound = async (data) => {
    onClose();
    const score = data.score;
    const newDate = date.toISOString().slice(0, 10);
    const email = localStorage.getItem("email");
    const round = { selectedCourse, tee, numHoles, newDate, score, email };
    reset({
      score: null,
    });
    try {
      setRefreshRounds(true);
      await axios.post("http://localhost:3000/rounds/postround", { round });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 ${
        open ? " bg-black/25" : "hidden"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white relative rounded-xl shadow-lg px-6 w-72 sm:w-[500px] h-[625px] items-center flex justify-center flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}>
          <IoCloseOutline className="w-8 h-8 right-2 top-2 absolute" />
        </button>
        <p className="flex self-center text-sm font-medium mb-1">Score</p>
        <LargeScoreInput
          name="score"
          register={register}
          error={errors.score}
        />
        <p className="flex self-start sm:ml-10 text-sm font-medium">Holes</p>
        <HolesSelector holes={setNumHoles} />
        <p className="flex self-start sm:ml-10 text-sm font-medium">Date</p>
        <DatePicker
          className="w-64 sm:w-96 text-center h-12 border bg-white border-gray-400 outline-none mb-4 rounded-md focus:border-golf shadow-golf focus:shadow-md"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="yyyy/MM/dd"
        />
        <p className="flex self-start sm:ml-10 text-sm font-medium">Course</p>
        <CourseSelector
          courses={courses.map(({ name, _id }) => [name, _id])}
          select={setCourseId}
          setCourse={setSelectedCourse}
        />
        <p className="flex self-start sm:ml-10 text-sm font-medium">Tee</p>
        <TeeSelector
          tees={
            tees &&
            tees.map(({ allInfo, _id, colour }) => [allInfo, _id, colour])
          }
          select={setTee}
        />
        <button
          onClick={handleSubmit(postRound)}
          className="shadow-xl w-64 sm:w-96 h-12 mt-6 rounded-2xl bg-golf text-white hover:brightness-75 transition duration-300 active:-translate-y-1"
        >
          Post Round
        </button>
      </div>
    </div>
  );
};

export default NewRoundForm;