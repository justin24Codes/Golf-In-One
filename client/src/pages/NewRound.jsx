import { useState, useEffect } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import LargeScoreInput from "../components/LargeScoreInput.jsx";
import CourseSelectorDropdown from "../components/CourseSelectorDropdown.jsx";
import HolesSelector from "../components/HolesSelector.jsx";
import Course from "../../../server/models/course.js";
import Selector from "../components/Selector.jsx";

import { getAllCourses } from "../services/Courses.js";

const NewRound = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseId, setCourseId] = useState("");
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
    console.log('Fetch Tees');
  }, [courseId]);

  return (
    <div className="flex flex-col w-screen h-screen font-noto-sans">
      <h1 className="text-3xl mt-20 font-bold text-center align-self-center">
        New Round
      </h1>
      {/* <div className="flex w-dvw h-dvh justify-center items-center"> */}

      {/* </div> */}
      <form
        onSubmit={handleSubmit(submitScore)}
        className="flex w-full h-screen content-center justify-center pt-4 flex-row"
      >
        <div className="grow w-1/2 flex justify-center items-center">
          <LargeScoreInput name="score" register={register} />
          {/* <button>Add Round</button> */}
        </div>
        <div className="w-1/2 grow flex flex-col justify-start items-center py-5">
          <DatePicker
            className="w-96 text-center h-12 border-2 border-black outline-none"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <HolesSelector />
          <Selector
            data={courses.map(({ name, _id }) => [name, _id])}
            select={setCourseId}
          />
          <Selector
            data={tees && tees.map(({ allInfo, _id }) => [allInfo, _id])}
            select={setTee}
          />
          <button className="border-2 border-black w-48 h-12 rounded-lg bg-golf">
            Post Round
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewRound;
