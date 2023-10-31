import React from "react";
import { Link } from "react-router-dom";

function ForNFor() {
  return (
    <div className="section p-16 items-center mx-auto">
      <h1 className="text-8xl text-green-600 text-shadow self-center">404</h1>
      <div className="mt-8 text-4xl font-semibold text-gray-600">
        Ooops!!! The page you are looking for is not found
      </div>
      <Link to={'/'}>
        <p className="inline-block border-2 border-gray-800 text-gray-800 uppercase font-semibold py-2 px-4 transition-transform transform hover:scale-105 shadow-md mt-4 hover:bg-gray-800 hover:text-gray-100">
          Back to home
        </p>
      </Link>
    </div>
  );
}

export default ForNFor;
