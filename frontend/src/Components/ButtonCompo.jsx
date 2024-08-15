export default function ButtonCompo({text,onClick}){
    return <>
    <div className="flex justify-center py-1">
    <button onClick={onClick} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-6 rounded mt-2">{text}</button>
    </div>
        
    </>
}