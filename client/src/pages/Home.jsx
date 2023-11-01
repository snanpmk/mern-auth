import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => {
    return state.user;
  });

  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold  mb-4 text-slate-800">Home</h1>
      <p className="mb-4 text-slate-700">
        This MERN (MongoDB, Express, React, Node.js) stack application with
        authentication offers various features. It utilizes{" "}
        <span className="font-bold">Redux Toolkit</span> for efficient state
        management, ensuring a seamless and responsive user experience. Users
        can <span className="font-bold">sign up</span>,{" "}
        <span className="font-bold">log in</span>, and{" "}
        <span className="font-bold">log out</span> with the security of{" "}
        <span className="font-bold">JWT (JSON Web Tokens)</span> authentication.
        Additionally, the application includes{" "}
        <span className="font-bold">Google authentication</span> for an easy and
        convenient login process. Users can also personalize their accounts by{" "}
        <span className="font-bold">uploading profile pictures</span>, creating
        a personalized and engaging user experience.
      </p>

      <p className="mb-4 text-slate-700">
        This application is intended as a starting point for building full-stack
        web applications with authentication using the MERN stack.
      </p>
      {currentUser && currentUser.role === "admin" ? (
        <Link to={"/dashboard"}>
          <button className="bg-blue-500  text-white p-3 rounded-lg">
            Go to Dashboard
          </button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
