import { dbConfig } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConfig();

export async function POST(req){
    const reqBody = await req.json();
    const {email, password} = reqBody;

    const user = User.findOne({email: email});

    if(!user){
        return NextResponse.json({message:"User does not exist"}, {status: 404});
    }

    console.log("User exists", user);

    // create token data
     const tokendata = {
        id: user._id,
        username: user.username,
        email: user.email,
     };

     //create token 
     
    


}