"use client";
import Link from "next/link";
import react from "react";
import {useState} from "react";
import {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {

    const router = useRouter();

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setloading] = useState(false);

    const[user, setUser] = useState({
        email:"",
        password:"",
        
    });

    const onLogin = async() => {

        try{
            setloading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            router.push("/profile");

        }
        catch(err){
            console.log("Login Failed", err.message);
        }
        finally{
            setloading(false);
        }

        }

    useEffect(() => {
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user]);


   
    const useremailChange = (e) => {
        setUser({...user, email:e.target.value});
    }
    
    const userpasswordChange = (e) => {
        setUser({...user, password:e.target.value});
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>{loading ? "Processing" : "Login"}</h1>
    <hr />
    
    <label htmlFor="email">email</label>
    <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={useremailChange}
        placeholder="email"/>
    
    <label htmlFor="username">password</label>
    <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={userpasswordChange}
        placeholder="password"/>
        <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
            Login 
        </button>
        <Link href="/signup">Visit SignUp page</Link>
    </div>
    

  )
}

export default LoginPage