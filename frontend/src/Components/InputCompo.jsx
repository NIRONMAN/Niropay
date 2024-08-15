export default function InputCompo({mainText,placeholder,onChange}){
    return (<>
        <h4 className="text-sm font-semibold p-1">
                {mainText}
            </h4>
            <div className="pb-1">
            <input onChange={onChange} className="border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full pl-3" placeholder={placeholder}></input>
            </div>
    </>)
}