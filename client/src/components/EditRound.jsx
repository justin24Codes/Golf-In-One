import { useState, useEffect } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import LargeScoreInput from "./LargeScoreInput.jsx";
import CourseSelectorDropdown from "./CourseSelectorDropdown.jsx";
import HolesSelector from "./HolesSelector.jsx";
import Course from "../../../server/models/course.js";
import Selector from "./Selector.jsx";

import { getAllCourses } from "../services/Courses.js";
import { IoCloseOutline } from "react-icons/io5";

const NewRoundForm = ({ onClose, open }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseId, setCourseId] = useState("6633fb8e2f3bccc0980a5cef");
  const [tee, setTee] = useState("");

  const [tees, setTees] = useState([]);

  const { register, handleSubmit } = useForm();

  const [startDate, setStartDate] = useState(new Date());

  const submitScore = (data) => {
    // console.log(data.score)
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await getAllCourses();
        setCourses(res.data);
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
        } catch (e) {
          console.log(e);
        }
      };
      getTees();
    }
  }, [courseId]);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-10 ${
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
        <p className='flex self-center text-sm font-medium mb-1'>Score</p>
        <LargeScoreInput name="score" register={register} />
        <p className='flex self-start sm:ml-10 text-sm font-medium'>Date</p>
        <DatePicker
          className="w-64 sm:w-96 text-center h-12 border-2 bg-gray-200 outline-none mb-4 rounded-md focus:border-golf"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <p className='flex self-start sm:ml-10 text-sm font-medium'>Holes</p>
        <HolesSelector />
        <p className='flex self-start sm:ml-10 text-sm font-medium'>Course</p>
        <Selector
          data={courses.map(({ name, _id }) => [name, _id])}
          select={setCourseId}
        />
        <p className='flex self-start sm:ml-10 text-sm font-medium'>Tee</p>
        <Selector
          data={tees && tees.map(({ allInfo, _id }) => [allInfo, _id])}
          select={setTee}
        />
        <button className="shadow-xl w-64 sm:w-96 h-12 rounded-2xl bg-golf text-white mt-6 hover:brightness-75 transition duration-300 active:-translate-y-1">
          Edit Round
        </button>
      </div>
    </div>
  );
};

export default NewRoundForm;