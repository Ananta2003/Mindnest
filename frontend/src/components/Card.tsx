import { LuNotebookText } from "react-icons/lu";
import { IoShareSocial } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";


const REACT_BACKEND_URL = import.meta.env.VITE_REACT_BACKEND_URL
export interface cardItems {
    text: string,
    link: string,
    id: string,
    type: "youtube" | "twitter",
}

export const Card = ({ text, type, link ,id}: cardItems) => {

    console.log(id)
    async function deleteContent() {
        axios.delete(`${REACT_BACKEND_URL}api/v1/delete`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            },
            data: {
                contentId: id
                
            }
            
        })
        window.location.reload()
    }
      

    return <div>
        <div className="p-8 max-w-auto bg-white rounded-md border-gray-300 border">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <div className="text-gray-500 text-md">
                        <LuNotebookText size={22} />
                    </div>
                    <h1 className="text-xl font-semibold">{text}</h1>
                </div>
                <div className="flex justify-between gap-2 items-center">
                    <div className="text-gray-500">
                        <a href={link}></a>
                        <IoShareSocial size={22} />
                    </div>
                    <div className="text-gray-500" onClick={deleteContent}>
                        <RiDeleteBinLine className="cursor-pointer"  size={22} />
                    </div>
                </div>
            </div>
            <div className="w-full ">

                {type === "twitter" && <div className="w-full "><blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote></div>}

                {type === "youtube" && <iframe className="w-full h-auto"  src={link.replace("watch", "embed").replace("?v=","/")} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowFullScreen></iframe>
           }

            </div>
        </div>
    </div>
}