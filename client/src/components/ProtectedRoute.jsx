import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const {currentUser} = useSelector((state) => state.user);
  return currentUser ? children : <Navigate to={"/sign-in"} />;
}
