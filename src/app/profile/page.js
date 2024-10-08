"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";

import {useRouter} from "next/navigation";

export default function ProfilePage(){

    const router= useRouter();

    const [data, setData] = useState("Nothing");


    const logout = async() => {
        try {
            await axios.get("api/users/logout");
            console.log("Logged out!");
            router.push("/login");
            
        } catch (error) {
            console.log("Error occurred", error.message);
        }

    }


    const getUserDetails = async() => {
        
        const res = await axios.get("/api/users/me");
        console.log("Hello");
        console.log(res);
        console.log(res.data);
        setData(res.data.data._id);
    }








    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
        <h2 className="p-1 rounded bg-green-500">{data === "Nothing" ? "User Id" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>
        <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>
          </div>
    )
}
