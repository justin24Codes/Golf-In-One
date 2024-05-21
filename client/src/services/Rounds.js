import axios from "axios";

const url = 'http://localhost:3000';

export const getAllRounds = async (req,res) => {
    const email = localStorage.getItem('email');
    try {
        const res = await axios.post(`${url}/rounds`, {email});
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const postRound = async (round) => {
    try {
        const res = await axios.post(`${url}/rounds`, {round});
        getAllRounds();
    } catch (e) {
        console.log(e);
    }
}
