import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between max-w-6xl mx-auto items-center p-3">
        <Link to={"/"}>
          <h1 className="font-bold  uppercase text-gray-700 text-lg">
            A u t h e n T i c a
          </h1>
        </Link>
        <ul className="flex gap-6">
          <Link to="/">
            <li className="">Home</li>
          </Link>
          <Link to="/about">
            <li className="">About</li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <img
                src={currentUser.profilePicture}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link to={"/sign-in"}>
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
