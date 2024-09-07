"use client";
import Link from "next/link";
import react from "react";
import { useRouter } from "next/router";
import axios from "axios";

const LoginPage = () => {
    const[user, setUser] = react.useState({
        email:"",
        password:"",
        username:'',
    });

    const onLogin = async() => {

        }


    const usernameChange = (e) => {
        setUser({...user, username:e.target.value});
    }
    const useremailChange = (e) => {
        setUser({...user, email:e.target.value});
    }
    
    const userpasswordChange = (e) => {
        setUser({...user, password:e.target.value});
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>Login</h1>
    <hr />
    <label htmlFor="username">username</label>
    
    <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={usernameChange}
        placeholder="username"/>
    
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