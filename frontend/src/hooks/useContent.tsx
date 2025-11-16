import axios from "axios";
import { useEffect, useState } from "react";
import dotenv from 'dotenv'

dotenv.config()
const REACT_BACKEND_URL = import.meta.env.VITE_REACT_BACKEND_URL
export function useContent(){

    const [contents , setContents]= useState([]);

    useEffect(()=>{
        axios.get(`${REACT_BACKEND_URL}api/v1/bulk`,{
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        })
        .then((response)=>{
            setContents(response.data.content)
        })
        
    },[])

    return contents
}