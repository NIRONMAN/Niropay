import React, { useState, useEffect } from "react";
import axios from "axios";
import HeadingComponent from "../Components/HeadingComponent";
import HeadingTwo from "../Components/HeadingTwo";
import UserCompo from "../Components/UserCompo";
import NameInitial from "../Components/NameInitial";
import { useNavigate } from "react-router-dom";

export default function DashBoard({ nameOfApp }) {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokentoset = localStorage.getItem("token");
    setToken(tokentoset);
    if (!tokentoset) {
      navigate("/");
    }
  }, [navigate]);

  const [userData, setUserData] = useState({
    balance: 0,
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!token) return;

    // Fetch user data and balance
    axios
      .all([
        axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            Authorization: "Bearer " + token
          }
        }),
        axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      ])
      .then(
        axios.spread((userResponse, balanceResponse) => {
          setUserData({
            balance: balanceResponse.data.balance,
            user: userResponse.data,
            loading: false,
            error: null
          });
        })
      )
      .catch(error => {
        setUserData({
          ...userData,
          loading: false,
          error: error.message
        });
      });
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-purple-900">
        <HeadingComponent text={nameOfApp} />
        <div className="flex justify-end items-center">
          <p className="p-2 text-white">
            Hello, {userData.user ? userData.user.firstName : "Guest"}
          </p>
          {userData.user && (
            <NameInitial theName={userData.user.firstName}></NameInitial>
          )}
          <button
            onClick={handleLogout}
            className="mx-2 p-2 bg-purple-600 hover:bg-purple-800 rounded-full text-white"
          >
            Logout
          </button>
        </div>
      </div>

      <div>
        <HeadingTwo
          heading2text={`Your balance ${userData.balance}`}
          className="text-lg font-bold text-purple-900"
        ></HeadingTwo>
      </div>

      <div>
        <UserCompo></UserCompo>
      </div>
    </>
  );
}
