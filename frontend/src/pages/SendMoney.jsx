import React, { useState } from "react";
import axios from "axios";
import HeadingComponent from "../Components/HeadingComponent";
import InputCompo from "../Components/InputCompo";
import ButtonCompo from "../Components/ButtonCompo";
import { useNavigate } from "react-router-dom";
import NameInitial from "../Components/NameInitial";

export default function SendMoney() {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const [amount, setAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const firstNameParam = "firstName";
    const idParam = "id";

    const handleTransfer = async () => {
        const token = localStorage.getItem("token");
        try {
            if (!token) {
                console.log("Token not found");
                return;
            }
            const response = await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                    to: queryParams.get(idParam),
                    amount: amount
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            navigate("/dashboard");
        } catch (error) {
            console.log("Error:", error.message);
            if (error.response && error.response.data && error.response.data.msg === "Insufficient amount") {
                setErrorMessage("Insufficient funds. \nYou will be redirected shortly.");
                // Navigate to dashboard after showing the error for 2 seconds
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000); // 2000 milliseconds = 2 seconds
            } else {
                setErrorMessage("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-purple-200">
            <div className="p-7 rounded-md bg-purple-50">
                <div className="p-4 pb-15">
                    <HeadingComponent text="Send Money" />
                </div>
                <div className="flex justify-items-start items-center">
                    <NameInitial theName={queryParams.get(firstNameParam)}></NameInitial>
                    <h2 className="p-2 font-bold text-xl">
                        {queryParams.get(firstNameParam)}
                    </h2>
                </div>

                <InputCompo
                    onChange={(e) => {
                        setAmount(e.target.value);
                    }}
                    mainText={"Amount in Rs."}
                    placeholder={"eg. 100 rs"}
                />

                <ButtonCompo
                    onClick={handleTransfer}
                    text={"Initiate Transfer"}
                />

                {errorMessage && (
                    <div className="text-red-600">{errorMessage}</div>
                )}
            </div>
        </div>
    );
}
