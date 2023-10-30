import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" action="">
        <img
          className="w-24 h-24 mt-2 self-center rounded-full object-cover cursor-pointer"
          src={currentUser.profilePicture}
          alt="profile"
        />
        <input
          type="username"
          defaultValue={currentUser.username}
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          autoComplete="Username"
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          autoComplete="Email"
        />
        <input
          type="password"
          defaultValue={currentUser.password}
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          autoComplete="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
    </div>
  );
}
