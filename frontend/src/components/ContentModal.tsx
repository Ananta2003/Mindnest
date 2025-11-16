import { RxCross1 } from "react-icons/rx";
import { Button } from "./Button";
import { useRef, useState } from "react";
import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()
const REACT_BACKEND_URL = process.env.REACT_BACKEND_URL

export const ContentModal = ({ open, onClose }: any) => {

     enum ContentType  {
        Youtube = "youtube",
        Twitter = "twitter"
    }

    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube)

    async function addContent() {

        const title =  titleRef.current.value;
        const link = linkRef.current.value;

        await axios.post(`${REACT_BACKEND_URL}api/v1/content`,{
            title,
            type,
            link,
            
        },{
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        })
        onClose();
        window.location.reload();
    }
    
   

    return <div>
        {open && <div>
            <div  className="w-screen h-screen bg-slate-500 fixed left-0 right-0 opacity-60 flex justify-center  "></div>
            <div  className="w-screen h-screen  fixed left-0 right-0 opacity-100 flex justify-center ">
                <div className="flex flex-col justify-center">
                    <span className="opacity-100 bg-white p-4 rounded-md">
                        <div className="flex justify-end" onClick={onClose}>
                            <RxCross1 />
                        </div>
                        <div>
                            <Input reference={titleRef} placeholder={"Title"} />
                            <Input reference={linkRef} placeholder={"Link"} />
                            <div className="flex gap-2 p-4">
                                <Button onClick={() => {
                                    setType(ContentType.Youtube)
                                }} size="md" text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} />
                                <Button onClick={() => {
                                    setType(ContentType.Twitter)
                                }} size="md" text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} />
                            </div>
                            <div className="flex  justify-center">
                                <Button onClick={addContent} size='md' variant="primary" text="Submit" />
                            </div>
                            

                        </div>
                    </span>
                </div>

            
            </div>
            
        </div>
        }
    </div>
}

function Input({ placeholder, reference }: any) {
    return <div>
        <input className="px-4 py-2 m-2 border rounded" type="text" placeholder={placeholder}  ref={reference} />
    </div>
}