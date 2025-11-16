import type { ReactElement } from "react";

export interface Buttonprops {
    variant: "primary"| "secondary";
    size : "sm"|"md"|"lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?:ReactElement;
    onClick ?: ()=> void;
}


const defaultStyle =
    "rounded-lg flex items-center border-none font-light"  

const variantStyle ={
    "primary": "bg-[#5045e6] text-[#ffff]",
    "secondary": "bg-[#e0e8ff] text-[#5045e6]"
} 

const sizeStyle ={
    "sm":"p-1" ,
    "md":"py-[10px] px-[20px]",
    "lg":"p-6 "
} 

export const Button = (props :Buttonprops )=>{
    return <button onClick={props.onClick} className={`${variantStyle[props.variant]} ${defaultStyle} ${sizeStyle[props.size]}`}>
        <div className="pr-2">
            {props.startIcon}
        </div>
        
        {props.text}
         </button>
}

