import { dbConfig } from "../../../dbConfig/dbConfig";
import User from "../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConfig();

export async function POST(req){
    try{
    const reqBody = await req.json();
    const {email, password} = reqBody;

    const user = await User.findOne({email: email});

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
     const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET,{expiresIn:"1d"});

     const response = NextResponse.json({
        message: "Login successful",
        success:true,
     })
     response.cookies.set("token", token, {
        httpOnly:true,
     })
    //  console.log(token);
     return response;
     
    }
    catch(err){
        return NextResponse.json({error:err.message}, {status:500});
    }
    


}