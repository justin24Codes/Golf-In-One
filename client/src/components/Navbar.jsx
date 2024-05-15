import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMenu, IoCloseOutline } from "react-icons/io5";

import DarkLogo from "../images/DarkLogo.png";
import LightLogo from "../images/LightLogo.png";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const homepage = location.pathname === "/";
  const courses = location.pathname === "/courses";
  const rounds = location.pathname === "/rounds";
  const handicap = location.pathname === "/handicap";

  const [textBlue, setTextBlue] = useState(true);
  const [transparentNavbar, setTransparentNavbar] = useState(true);
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changeNavbarColour = () => {
    window.scrollY >= 100
      ? setTransparentNavbar(false)
      : setTransparentNavbar(true);
  };

  const changeNav = () => {
    setNav(!nav);
  };

  window.addEventListener("scroll", changeNavbarColour);

  const loggedIn = localStorage.getItem('loggedIn');

  const logout = async () => {
    // await axios.post('http://localhost:3000/logout')
    localStorage.clear();
    changeNav();
    navigate("/login");
  };

  return (
    <>
      <div
        className={` ${!homepage && "bg-white"} ${
          transparentNavbar ? "bg-transparent" : "bg-white"
        } h-16 w-full flex flex-row justify-between items-center fixed top-0 left-0 z-20 ${
          transparentNavbar ? null : "shadow-md"
        } ${!homepage ? "shadow-md" : null}`}
      >
        <div onClick={changeNav} className="md:hidden absolute right-4 z-40">
          {nav ? <IoCloseOutline size={25} /> : <IoMenu size={25} color={homepage ? 'white' : 'black'} />}
        </div>
        <div className={`flex ease-in-out duration-300 h-3/4 shadow-2xl items-center justify-center drop-shadow-xl ${nav
            ? 'fixed md:hidden left-0 top-0 w-full bg-white'
            : 'w-full fixed top-[-100%]'}`}>
            <div className='w-2/3 h-2/3 flex py-6 items-center justify-center flex-col'>
            <Link
            onClick={changeNav}
            to="/courses"
            className={`text-gray-950 font-noto-sans font-bold text-3xl transition-all duration-30 hover:scale-125 hover:text-golf`}
          >
            Courses
          </Link>
          <Link
          onClick={changeNav}
            to="/rounds"
            className={`text-gray-950 font-noto-sans font-bold text-3xl transition-all duration-300 my-12 hover:scale-125 hover:text-golf`}
          >
            Rounds
          </Link>
          <Link
          onClick={changeNav}
            to="/handicap"
            className={`text-gray-950 font-noto-sans font-bold text-3xl transition-all duration-300 hover:scale-125 hover:text-golf`}
          >
            Handicap
          </Link>
          {!loggedIn ?  <>
          <Link
          onClick={changeNav}
            to="/signup"
            className={`text-gray-950 font-noto-sans font-bold text-3xl transition-all duration-300 my-12 hover:scale-125 hover:text-golf`}
          >
            Sign Up
          </Link>
          <Link
          onClick={changeNav}
            to="/login"
            className={`text-gray-950 font-noto-sans font-bold text-3xl transition-all duration-300 hover:scale-125 hover:text-golf`}
          >
            Login
          </Link > </> : <button onClick={logout} className={`text-gray-950 font-noto-sans font-bold text-3xl transition-all duration-300 hover:scale-125 hover:text-golf my-12`}>Logout</button>}
            </div>
        </div>
        <div className="flex flex-row items-center md:visible invisible z-50">
          <Link to='/' className='flex-shrink-0'>
            <img
              src={homepage ? nav ? DarkLogo : LightLogo : !homepage ? DarkLogo : LightLogo}
              className="w-15 h-14 hover:scale-105 transition-all visible object-cover"
            />
          </Link>
          <Link
            to="/courses"
            className={`${transparentNavbar ? "text-white" : "text-black"} ${
              !homepage ? "text-gray-950" : "text-white"
            } font-noto-sans font-semibold text-lg ml-8 transition-none duration-300 ${
              courses
                ? "text-newGolf underline underline-offset-8 decoration-4 hover:brightness-125"
                : "hover:scale-110 hover:text-gray-600 hover:underline hover:underline-offset-8 hover:decoration-4"
            }`}
          >
            Courses
          </Link>
          <Link
            to="/rounds"
            className={`${transparentNavbar ? "text-white" : "text-dark"} ${
              !homepage ? "text-gray-950" : "text-white"
            } font-noto-sans font-semibold text-lg mx-8 transition-none duration-300 ${
              rounds
                ? "text-newGolf underline underline-offset-8 decoration-4 hover:brightness-125"
                : "hover:scale-110 hover:text-gray-600 hover:underline hover:underline-offset-8 hover:decoration-4"
            }`}
          >
            Rounds
          </Link>
          <Link
            to="/handicap"
            className={`${transparentNavbar ? "text-white" : "text-black"} ${
              !homepage ? "text-gray-950" : "text-white"
            } font-noto-sans font-semibold text-lg transition-none duration-300  ${
              handicap
                ? "text-newGolf underline underline-offset-8 decoration-4 hover:brightness-125"
                : "hover:scale-110 hover:text-gray-600 hover:underline hover:underline-offset-8 hover:decoration-4"
            }`}
          >
            Handicap
          </Link>
        </div>
        <div className="flex flex-row pr-4 md:visible invisible">
          {!loggedIn ? 
          <>
          <SignUpButton
            transparentNavbar={transparentNavbar}
            homepage={homepage}
          />
          <LoginButton /> </> : <LogoutButton />}
         </div>
        
      </div>
    </>
  );
};

export default Navbar;
