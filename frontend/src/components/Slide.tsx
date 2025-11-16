import type { ReactElement } from "react"

export function Slide ({icon,text,onclick}:{
    icon:ReactElement;
    text:string;
    onclick?:any
    type?:string
    
}){


    return<div className="px-4 py-2 hover:bg-gray-200 rounded">
            <div onClick={onclick} className="flex items-center text-lg p-4">
                {icon}
                <h1 className="px-2">{text}</h1>
            </div>
        </div>
}