import { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dotenv from 'dotenv'

dotenv.config()
const REACT_BACKEND_URL = process.env.REACT_BACKEND_URL



export const Signup = () => {

    const usernameRef = useRef<HTMLInputElement| null>(null);
    const passwordRef = useRef<HTMLInputElement| null>(null);
    const navigate = useNavigate();


    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(REACT_BACKEND_URL +"api/v1/signup", {
            username,
            password
        })
        navigate('/signin')
        alert("Hii")

    }

    return <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="min-w-48 h-2/3 bg-White shadow-2xl p-8 rounded-xl">
            <h1 className="flex justify-center text-4xl p-4 mb-4">Sign Up</h1>
            <div className="flex justify-center">
                <Input reference={usernameRef} placeholder="Username" />
            </div>
            <div className="flex justify-center">
                <Input reference={passwordRef} placeholder="Password" />
            </div>
            
            <div className="flex justify-center pt-4">
                <Button onClick={signup} variant="primary" size="md" text="Sign Up" />
            </div>
            <p className="p-8">Already have Account <a href="/signin" className="text-blue-500 hover:text-blue-700">Signin</a></p>
        </div>

    </div>
}