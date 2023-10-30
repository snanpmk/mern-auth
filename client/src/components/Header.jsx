import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between max-w-6xl mx-auto items-center p-3">
        <h1 className="font-bold">Auth App</h1>
        <ul className="flex gap-6">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
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
