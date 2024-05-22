import GolfBackground from "../images/GolfHole.jpg";
import GolfBackground3 from "../images/GolfBackground3.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col content-end justify-items-end font-noto-sans top-0">
      <img className="img object-cover w-screen h-dvh" src={GolfBackground3} />
      <div className="absolute top-1/3 left-1/5 w-full h-1/4 flex flex-col justify-center items-center">
        <h1 className=" text-5xl font-[900] text-center leading-normal text-white ">
          Lower Scores Immediately
        </h1>
        <h2 className="text-md sm:text-lg font-semibold text-center leading-normal text-white mt-2 mb-6">
          Track Handicap, Browse Courses, Log Rounds
        </h2>
        <Link
          to="/courses"
          className="flex w-44 justify-center items-center text-white bg-golf text-lg border-2 border-golf rounded-2xl font-semibold shadow-md shadow-white transition-all duration-300 delay-100 hover:brightness-75 hover:translate-y-2 active:rotate-6"
        >
          <button className="h-10">Start Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
