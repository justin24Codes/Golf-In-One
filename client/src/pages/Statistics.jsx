import PageTitle from "../components/PageTitle.jsx";
import StatCard from "../components/StatCard.jsx";
import { getAllRounds } from "../services/Rounds.js";

import { useEffect, useState } from "react";

const Statistics = () => {
  const [rounds, setRounds] = useState([]);
  const [scores, setScores] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [lowestScore, setLowestScore] = useState(0);


  useEffect(() => {
    const getRounds = async () => {
      try {
        const res = await getAllRounds();
        setRounds(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getRounds();
  }, []);

  useEffect(() => {
    setScores(rounds.map(round => round.score));
  }, [rounds]);

  useEffect(() => {
    //Average Score
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const average = scores.length > 0 ? totalScore / scores.length : 0;
    const avgScore = average.toFixed(1);
    setAverageScore(avgScore);

    //Lowest Score
    setLowestScore(Math.min(...scores));
  }, [scores]);

  return (
    <div className="flex flex-col content-end justify-items-end font-noto-sans top-0">
      <div className="flex flex-col items-center pb-8">
        <PageTitle title="Statistics" />
        <div className="flex flex-row flex-wrap justify-center mt-16">
          <StatCard label="Handicap" value={localStorage.getItem("handicap")}/>
          <StatCard label="Rounds Played" value={rounds.length} />
          <StatCard label="Lowest Score" value={lowestScore < 1000 ? lowestScore : 0}/>
          <StatCard label="Average Score" value={averageScore}/>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
