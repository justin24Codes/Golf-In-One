import FormTitle from "../components/FormTitle";
import FormSubmitButton from "../components/FormSubmitButton";
import OtherFormLink from "../components/OtherFormLink";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const createAccount = (data) => {
    const { email, password } = data;
    axios
      .post("http://localhost:3000/login", { email, password })
      .then((res) => {
        if (res.data === "Success") {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("email", email);
          navigate("/rounds");
        } else {
          setLogin(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="h-screen pt-16 font-noto-sans bg-gray-100">
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(createAccount)}
          className="bg-white w-[300px] sm:w-[400px] h-[500px] rounded-3xl shadow-2xl flex flex-col pt-10 justify-start items-center"
        >
          <FormTitle title="Welcome Back" />
          <p className="w-60 sm:w-80 pl-2 text-xs font-semibold mb-1 mt-8">
            Email
          </p>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className={`border border-gray-400 w-60 sm:w-80 h-12 outline-none rounded-lg pl-4 text-black focus:border-golf shadow-golf focus:shadow-md ${
              errors.email && "border-red-600 focus:border-red-600"
            }`}
          />
          <div className="h-8">
            {errors.email && (
              <p className="text-xs text-red-600 w-60 sm:w-80 pl-2 mt-1">
                Email is required
              </p>
            )}
          </div>
          <p className="w-60 sm:w-80 pl-2 text-xs font-semibold mb-1">
            Password
          </p>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={`border border-gray-400 w-60 sm:w-80 h-12 outline-none rounded-lg pl-4 text-black focus:border-golf shadow-golf focus:shadow-md ${
              errors.password && "border-red-600 focus:border-red-600"
            }`}
          />
          <div className="h-8">
            {errors.password && (
              <p className="text-xs text-red-600 w-60 sm:w-80 pl-2 mt-1">
                Password is required
              </p>
            )}
          </div>
          <div className="flex-grow flex items-center flex-col mt-4">
            {login && (
              <p className="text-red-600 mb-8 font-semibold">
                Username or password is incorrect
              </p>
            )}
            <FormSubmitButton label="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
