import Course from "../components/Course.jsx";
import { getAllCourses } from "../services/Courses.js";
import { useState, useEffect } from "react";

import PageTitle from "../components/PageTitle.jsx";
import Searchbar from "../components/Searchbar.jsx";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

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

  return (
    <div className="flex flex-col content-end justify-items-end font-noto-sans top-0">
      <PageTitle title="Courses" />
      <Searchbar setSearch={setSearch} search={search} />
      <div className=" bg-white pt-8 flex flex-row my-10 mx-8 flex-wrap justify-center">
        {/* {courses.map((course) => (
          <Course
            imageUrl={course.imageUrl}
            name={course.name}
            tees={course.tees}
            par={course.par}
            key={course._id}
          />
        ))} */}
        {courses
          .filter((course) => {
            if (search === "") {
              return course;
            } else if (
              course.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            }
          })
          .map((course) =>
              <Course
                imageUrl={course.imageUrl}
                name={course.name}
                tees={course.tees}
                par={course.par}
                key={course._id}
              />            
          )}
      </div>
    </div>
  );
}

export default Courses;
