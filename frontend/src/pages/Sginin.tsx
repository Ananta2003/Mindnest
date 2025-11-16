import { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export const Signin =()=>{

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate()
    


    async function signin(){
        const username= usernameRef.current?.value;
        const password= passwordRef.current?.value;
        const response = await axios.post(BACKEND_URL + "api/v1/signin",{
                username,
                password
        })
        const jwt = response.data.token;
        localStorage.setItem("token",jwt);
        navigate('/dashboard')
        }
        
 
    return <div className="w-full h-screen bg-White flex items-center justify-center">
        <div className="min-w-48 h-2/3 bg-White shadow-2xl p-8 rounded-xl">
            <h1 className="flex justify-center text-4xl p-4 mb-4">Sign In</h1>
            <div className="flex justify-center">
                <Input reference={usernameRef} placeholder="Username" />
            </div>
            <div className="flex justify-center">
                <Input reference={passwordRef} placeholder="Password" />
            </div>
            
            <div className="flex justify-center pt-4">
                <Button onClick={signin} variant="primary" size="md" text="Sign In" />
            </div>
            <p className="p-8">Don't have Account <a href="/" className="text-blue-500 hover:text-blue-700">SignUp</a></p>
        </div>
    </div>
}