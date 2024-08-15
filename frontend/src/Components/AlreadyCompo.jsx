import { Link } from "react-router-dom";

export default function AlreadyCompo({text,linktext,to}){
    return <>
    {text} 
    <Link  to={to}>
    <span className="text-blue-500 hover:text-blue-700 underline">{linktext}</span>
    </Link>
    </>
}