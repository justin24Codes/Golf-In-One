import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginButton = () => {
  const navigate = useNavigate();

  const logout = async () => {
    // await axios.post('http://localhost:3000/logout')
    localStorage.clear();
    navigate("/login");
  };

  return (
    <button
      onClick={logout}
      className=" text-white bg-golf shadow-lg font-noto-sans font-semibold text-lg w-24 h-10 border-2 border-golf rounded-2xl transition-none hover:brightness-125"
    >
      Logout
    </button>
  );
};

export default LoginButton;
