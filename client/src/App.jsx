import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ForNFor from "./pages/ForNFor";

export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser, "////");
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/"  element= {<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {currentUser && currentUser.role === "admin" ? (
          <>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path="/admin" element={<ForNFor />} />
            <Route path="/dashboard" element={<ForNFor />} />
          </>
          
        )}
      </Routes>
    </BrowserRouter>
  );
}
