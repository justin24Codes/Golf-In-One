import axios from "axios";

const url = 'http://localhost:3000';

export const getAllCourses = async () => {
    try {
        const res = await axios.get(`${url}/courses`);
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const getCourse = async (id) => {
    try {
        const res = await axios.get(`${url}/courses/${id}`);
        return res;
    } catch (e) {
        console.log(e)
    }
}