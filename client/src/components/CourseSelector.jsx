import { useState, useEffect } from "react";
import { getAllCourses, getCourse } from "../services/Courses.js";
import axios from "axios";

const CourseSelector = ({ courses, select, setCourse, defaultValue, defaultValueId }) => {

  const [courseId, setCourseId] = useState('');

  const selection = (e) => {
    setCourse(e.target.value);
    select(e.target.value);
    setCourseId(e.target.value);
    // setSelectedCourse(e.target.value)
  };

  useEffect(() => {
    if (defaultValue) {
      setCourseId(defaultValueId);
    }

  }, [defaultValueId]);

  useEffect(() => {
    const findCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/courses/${courseId}`);
        setCourse(res.data.name);
      } catch (e) {
        console.log(e);
      }
    };
    findCourse();
  }, [courseId]);

  return (
    <select
      className="w-64 sm:w-96 h-12 mb-4 bg-white rounded-md outline-none px-2 focus:border-golf border border-gray-400 focus:shadow-md shadow-golf"
      onChange={selection}
      value={courseId}
      // value={selectedCourse}
    >
      {defaultValue && <option value={defaultValueId}>{defaultValue}</option>}
      {courses.map((item) => (
        <option key={item[1]} value={item[1]}>
          {item[0]}
        </option>
      ))}
    </select>
  );
};

export default CourseSelector;
