import { Link, useLocation } from "react-router-dom";

const LoginButton = ({transparentNavbar, homepage}) => {

  return (
    <div>
      <Link
        to="/signup"
        // className={`${transparentNavbar ? 'text-white' : 'text-golf-green'} ${!homepage ? 'text-golf-green' : 'text-white'} flex font-noto-sans font-semibold border-2 border-golf text-lg w-24 h-10 rounded-3xl justify-center`}
        className={`text-golf hover:brightness-125 flex font-noto-sans font-semibold text-lg w-24 h-10 justify-center`}
      >
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default LoginButton;
