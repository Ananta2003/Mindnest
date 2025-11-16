import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuBrain } from "react-icons/lu";
import { Slide } from "./Slide";

interface data {
    onDataSend:any
}

export const Sidebar = (props:data) => {

    const sendDataToParent =(id:string)=>{
        props.onDataSend(id)
    }

    return <div className="max-w-72 bg-white fixed">
        <div className="flex items-center px-10 py-8 font-light">
            <LuBrain size={40} color="#4e47e2" />
            <h1 className="px-2 text-3xl">MINDNEST</h1>
        </div>
        <div className="px-8 py-8">
            <Slide onclick={()=>{sendDataToParent("youtube")}} type="youtube" icon={<FaYoutube />} text="Youtube"/>
            <Slide onclick={()=>{sendDataToParent("Twitter")}} type="twitter" icon={<FaXTwitter />} text="Twitter" />
            <Slide onclick={sendDataToParent} icon={<IoDocumentTextOutline />} text="Document" />


        </div>


    </div>
}
