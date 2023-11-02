import React from "react";
import { Link } from "react-router-dom";

function ForNFor() {
  return (
    <div className="section text-center p-16 items-center mx-auto">
      <h1 className="text-9xl text-center text-green-600 self-center">404</h1>
      <div className="mt-8 text-4xl font-semibold text-gray-600">
        Ooops!!!, The page you are looking for is not found.
      </div>
      <Link to={'/'}>
        <p className="inline-block mt-20 border-2 border-gray-800 text-gray-800 uppercase font-semibold py-2 px-4 transition-transform transform hover:scale-105 shadow-md  hover:bg-gray-800 hover:text-gray-100">
          Back to home
        </p>
      </Link>
    </div>
  );
}

export default ForNFor;
