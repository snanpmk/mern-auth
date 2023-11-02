import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => {
    return state.user;
  });

  return (
    <div className="px-4 py-3 max-w-2xl  mx-auto">
      <h1 className="text-2xl mt-5 font-bold text-center  mb-4 text-slate-800">
        Hey there!
      </h1>
      <img
        className="w-2/4 mx-auto"
        src="https://cdni.iconscout.com/illustration/premium/thumb/authentication-code-4487189-3726252.png?f=webp"
        alt="clipart"
      />
      <p className="mb-4 text-slate-700">
        Welcome to Authentica, our MERN (MongoDB, Express, React, Node.js)
        application with authentication! Enjoy a seamless user experience with{" "}
        <span className="font-bold">Redux Toolkit</span> for state management
        and secure <span className="font-bold">JWT</span> authentication. You
        can <span className="font-bold">sign up</span>,{" "}
        <span className="font-bold">log in</span>, and use{" "}
        <span className="font-bold">Google authentication</span> for easy
        access. Personalize your experience by{" "}
        <span className="font-bold">uploading profile pictures</span>.
      </p>

      <p className="mb-4 text-slate-700">
        This application is intended as a starting point for building full-stack
        web applications with authentication using the MERN stack.
      </p>
      {currentUser && currentUser.role === "admin" ? (
        <Link to={"/dashboard"}>
          <button className="bg-blue-400 font-semibold  text-white p-3 rounded-lg">
            Go to Dashboard
          </button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
