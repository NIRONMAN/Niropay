import { Link, useNavigate } from "react-router-dom";

import { useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token !== null && token !== "") {
      navigate("/dashboard");
    }
  }, [ token]);

  return (
    <div className="flex flex-col justify-center items-center  bg-blue-100 min-h-screen pb-10">
      <div className="font-bold text-5xl p-3 text-purple-900">
        Welcome to Niropay
      </div>
      <div className="mt-4 flex justify-center">
        <div className="mb-2">First time here? </div>
        <Link
          to={"/signup"}
          className="text-purple-500 hover:text-purple-700 font-bold px-1"
        >
          Create an account
        </Link>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="mb-2">For our Regular's  </div>
        <Link
          to={"/signin"}
          className="px-1 text-purple-500 hover:text-purple-700 font-bold"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
