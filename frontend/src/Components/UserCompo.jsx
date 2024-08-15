import { useState ,useEffect} from "react";
import HeadingTwo from "./HeadingTwo";
import NameInitial from "./NameInitial";
import ButtonCompo from "./ButtonCompo";
import axios from "axios";
import InputCompo from "./InputCompo";
import { useNavigate } from "react-router-dom";

export default function UserCompo(){

    const [userArray,setUserArray]=useState([]);
    const [inputResult,SetInputResult]=useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk", { params: { filter: inputResult } })
            .then((response) => {
                setUserArray(response.data.users);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [inputResult]);
    return <>
         <div>
           <HeadingTwo heading2text={"Users"}></HeadingTwo>
            <div className="px-5">
            <InputCompo onChange={(e)=>{
                SetInputResult(e.target.value);
            }} mainText={""} placeholder={"Search..."}></InputCompo>
            </div>
        </div>
       
        {userArray.map((element)=>{
            return(
                
                <SmallUser obj={element}></SmallUser>
            )
            
        })}
    </>
}

function SmallUser({obj}){
    const navigate=useNavigate();
    return (
        <div className="flex justify-between p-4 ps-5 ">
        <div className="flex justify-start">
        <NameInitial theName={obj.firstName}></NameInitial>
        <HeadingTwo heading2text={`${obj.firstName} ${obj.lastName}`}></HeadingTwo> 
        </div>
     
        <ButtonCompo onClick={()=>{
            navigate(`/send?id=${obj._id}&&firstName=${obj.firstName}`)
        }} text={"Send Money"}></ButtonCompo>
        </div>
    )
}