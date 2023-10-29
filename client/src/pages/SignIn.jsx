import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {signInStart, signInSuccess, signInFailure} from '../redux/users/userSlice'
import { useDispatch,useSelector } from "react-redux";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const {loading,error} = useSelector((state) => state.user)
  console.log(error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      dispatch(signInStart())
      e.preventDefault();
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        dispatch(signInFailure(data))
        return
      }
      dispatch(signInSuccess(data));
      navigate("/")
    } catch (error) {
      dispatch(signInFailure(error))
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-extrabold uppercase my-7">
        Sign In
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          autoComplete="Email"
          onChange={handleOnChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          autoComplete="password"
          onChange={handleOnChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading...." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 font-semibold mt-5">
        {error ? error.message || "something went wrong!!" :""}
      </p>
    </div>
  );
}
