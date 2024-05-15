import FormTitle from "../components/FormTitle";
import FormSubmitButton from "../components/FormSubmitButton";
import OtherFormLink from "../components/OtherFormLink";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import GolfBackground3 from "../images/GolfBackground3.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [uniqueEmail, setUniqueEmail] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const createAccount = (data) => {
    const { name, email, password } = data;
    axios
      .post("http://localhost:3000/signup", { name, email, password })
      .then((res) => {
        if (res.data === 'User Found') {
          setUniqueEmail(false);
        } else {
          localStorage.setItem('loggedIn', true );
          localStorage.setItem('email', email)
          navigate("/rounds");
        }
      })
      .catch( e => {console.log(e)})
  };

  return (
    <>
      <div className="h-screen pt-16 font-noto-sans bg-gray-100">
        <div className="w-full h-full flex items-center justify-center">
          <form
            onSubmit={handleSubmit(createAccount)}
            className="bg-white w-[300px] sm:w-[400px] h-[500px] rounded-3xl shadow-2xl flex flex-col pt-10 justify-start items-center"
          >
            <FormTitle title="Sign Up" />
            <p className="mt-8 w-60 sm:w-80 pl-2 text-xs font-semibold mb-1">
              Name
            </p>
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className={`border border-gray-400 w-60 sm:w-80 h-12 outline-none rounded-lg pl-4 text-black focus:border-golf shadow-golf focus:shadow-md ${
                errors.name && "border-red-600 focus:border-red-600"
              }`}
            />
            <div className="h-8">
              {errors.name && (
                <p className="text-xs text-red-600 font-md w-60 sm:w-80 pl-2 mt-1">
                  Name is required
                </p>
              )}
            </div>
            <p className="w-60 sm:w-80 pl-2 text-xs font-semibold mb-1">
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
                <p className="text-xs text-red-600 font-md w-60 sm:w-80 pl-2 mt-1">
                  A valid email is required
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
            <div className="h-6">
              {errors.password && (
                <p className="text-xs text-red-600 font-md w-60 sm:w-80 pl-2 mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>
            <div className="flex-grow flex items-center flex-col justify-center">
              {!uniqueEmail && <p className='text-red-600 font-semibold mb-2'>Email is already in use</p>}
              <FormSubmitButton />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
