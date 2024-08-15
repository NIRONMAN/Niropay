import { useState } from "react";
import AlreadyCompo from "../Components/AlreadyCompo";
import ButtonCompo from "../Components/ButtonCompo";
import HeadingComponent from "../Components/HeadingComponent";
import InputCompo from "../Components/InputCompo";
import SubHeading from "../Components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin(){
    const navigate=useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    return <div className="fixed inset-0 flex items-center justify-center bg-purple-200">
            
            <div className="p-7 rounded-md bg-purple-50">

            <HeadingComponent text="Sign In"></HeadingComponent>

            <SubHeading text="Log into your Account"></SubHeading>

            <InputCompo onChange={(e)=>{
                setUsername(e.target.value);
            }} mainText={"Email/Username"} placeholder={"niranjan@niro.com"}></InputCompo>
            <InputCompo onChange={(e)=>{
                setPassword(e.target.value);
            }} mainText={"Password"} placeholder={"******"}></InputCompo>
            <ButtonCompo onClick={async ()=>{
                const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
                    username,
                    password
                })
                localStorage.setItem("token",response.data.token);
                navigate("/dashboard")

            }} text={"Sign In"}></ButtonCompo>
            <AlreadyCompo text={"Don't have an acoount? "} to={"/signup"} linktext={"Signup"}></AlreadyCompo>
           

            </div>
        </div>
    
};