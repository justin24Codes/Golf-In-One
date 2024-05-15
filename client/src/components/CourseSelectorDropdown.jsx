import { useState, useEffect } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

import { getAllCourses } from "../services/Courses.js";
import course from "../../../server/models/course";

const CourseSelectorDropdown = () => {

    const [open, setOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('Select Course')

    const toggleDropdown = () => {
        setOpen((open) => !open);
    }

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
        <div className='flex relative flex-col items-center w-96 h-12 my-6'>
            <button onClick={toggleDropdown} className='flex w-full justify-between items-center p-4 truncate border-2 border-black'>
                {selectedCourse}
                {
                    open ? <AiFillCaretUp className='h-6'/> : <AiFillCaretDown className='h-6'/>
                }

                {open && <div className='absolute top-16 left-0 flex flex-col items-start w-full h-52 overflow-y-scroll z-50' key={course._id}>
                        {courses.map((course) => (
                            <button onClick={() => {setSelectedCourse(course.name)}} className='h-8 flex items-center content-center py-6 px-2 border-2 w-full border-black bg-blue-300'>
                                <p>{course.name}</p>
                            </button>
                        ))}
                    </div>}
            </button>
        </div>
    )
};

export default CourseSelectorDropdown;