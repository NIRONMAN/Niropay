import { useState } from "react";
import AlreadyCompo from "../Components/AlreadyCompo";
import ButtonCompo from "../Components/ButtonCompo";
import HeadingComponent from "../Components/HeadingComponent";
import InputCompo from "../Components/InputCompo";
import SubHeading from "../Components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const navigate=useNavigate();
        const [username,setUsername]=useState("");
        const [password,setPassword]=useState("");
        const [firstName,setFirstname]=useState("");
        const [lastName,setLastname]=useState("");
    return <div className="fixed inset-0 flex items-center justify-center bg-purple-200">
            
            <div className="p-7 rounded-md bg-purple-50">

            <HeadingComponent text="Sign up"></HeadingComponent>

            <SubHeading text="Enter your information to Create an Account"></SubHeading>
            <InputCompo mainText={"First Name"} placeholder={"Niranjan"} onChange={(e)=>{
                setFirstname(e.target.value);
            }}></InputCompo>
            <InputCompo mainText={"Last Name"} placeholder={"Dabhade"} onChange={(e)=>{
                setLastname(e.target.value);
            }}></InputCompo>
            <InputCompo mainText={"Email/Username"} placeholder={"niranjan@niro.com"} onChange={(e)=>{
                setUsername(e.target.value);
            }}></InputCompo>
            <InputCompo mainText={"Password"} placeholder={"******"} onChange={(e)=>{
                setPassword(e.target.value);
            }
                
            }></InputCompo>
            <ButtonCompo onClick={()=>{
              axios.post("http://localhost:3000/api/v1/user/signup", {
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName
})
.then(response => {
    console.log('Signup successful:', response.data);
    localStorage.setItem("token",response.data.token);
    navigate("/");
})
.catch(error => {
    // Handle error
    console.error('Error signing up:', error);
});
            }} text={"Signup"}></ButtonCompo>
            <AlreadyCompo text={"Already have an acoount? "} linktext={"Signin"} to={"/signin"}></AlreadyCompo>
           

            </div>
        </div>
    
};