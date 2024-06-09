import { useState, useEffect } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import LargeScoreInput from "./LargeScoreInput.jsx";
import CourseSelectorDropdown from "./CourseSelectorDropdown.jsx";
import HolesSelector from "./HolesSelector.jsx";
import Course from "../../../server/models/course.js";
import CourseSelector from "./CourseSelector.jsx";
import TeeSelector from "./TeeSelector.jsx";
import EditRoundCourseSelector from "./EditRoundCourseSelector.jsx";
import EditFormTeeSelector from "./EditFormTeeSelector.jsx";

import { getAllCourses } from "../services/Courses.js";
import { IoCloseOutline } from "react-icons/io5";

const EditRoundForm = ({ onClose, open, id, setRefreshRounds }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseId, setCourseId] = useState("666536d8865e1ff622f7aca9");
  const [tee, setTee] = useState("");
  const [numHoles, setNumHoles] = useState("18");

  const [tees, setTees] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState("");

  const [round, setRound] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const editRound = async (data) => {
    onClose();
    const score = data.score;
    const email = localStorage.getItem('email');
    const newDate = date.toISOString().slice(0, 10);
    const roundId = round._id;
    const editedRound = { course:selectedCourse, tee, numHoles, date:newDate, score, email, id:roundId };
    try {
      setRefreshRounds(true);
      await axios.put('http://localhost:3000/rounds', {editedRound});
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await getAllCourses();
        setCourses(res.data);
        setSelectedCourse(res.data[0].name);
        setTee(res.data[0].tees[0].colour);
      } catch (e) {
        // console.log(e);
      }
    };
    getCourses();
  }, []);

  useEffect(() => {
    // if (courseId) {
    const getTees = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/courses/${courseId}`
        );
        setTees(res.data.tees);
        setTee(res.data.tees[0].colour);
        setSelectedCourse(res.data.name)
      } catch (e) {
        console.log(e);
      }
    };
    getTees();
    // }
  }, [courseId]);

  useEffect(() => {
    const getRound = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/rounds/${id}`);
        setRound(res.data);
        const oldDate = new Date(res.data.date);
        setDate(oldDate);
        const courseName = res.data.course;
        const response = await axios.post(`http://localhost:3000/course`, {
          courseName
        });
        setTees(response.data.tees);
      } catch (e) {}
    };
    getRound();
  }, [id]);

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
        <LargeScoreInput placeholder={round} name="score" register={register} />
        <p className="flex self-start sm:ml-10 text-sm font-medium">Date</p>
        <DatePicker
          className="w-64 sm:w-96 text-center h-12 border border-gray-400 bg-white outline-none mb-4 rounded-md focus:border-golf"
          selected={date}
          dateFormat="yyyy/MM/dd"
          onChange={(date) => setDate(date)}
        />
        <p className="flex self-start sm:ml-10 text-sm font-medium">Holes</p>
        <HolesSelector holes={setNumHoles} initialHoles={round.numHoles} />
        <p className="flex self-start sm:ml-10 text-sm font-medium">Course</p>
        <EditRoundCourseSelector
          courses={courses.map(({ name, _id }) => [name, _id])}
          select={setCourseId}
          setCourse={setSelectedCourse}
          defaultValue={round.course}
          defaultValueId={round._id}
        />
        <p className="flex self-start sm:ml-10 text-sm font-medium">Tee</p>
        <TeeSelector
          defaultValue={round.tee}
          tees={
            tees &&
            tees.map(({ allInfo, _id, colour }) => [allInfo, _id, colour])
          }
          select={setTee}
          id={round._id}
        />
        <button
          onClick={handleSubmit(editRound)}
          className="shadow-xl w-64 sm:w-96 h-12 rounded-2xl bg-golf text-white mt-6 hover:brightness-75 transition duration-300 active:-translate-y-1"
        >
          Edit Round
        </button>
      </div>
    </div>
  );
};

export default EditRoundForm;
