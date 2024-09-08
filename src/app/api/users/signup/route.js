import { dbConfig } from "@/app/dbConfig/dbConfig.js"; 
import User from "@/app/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


dbConfig();


export async function POST(req){
    try{
        const reqBody = await req.json();
        const {username, email, password} = reqBody;

        const user = User.findOne({email:email});

        // check if user already exists
        if (user){
            return NextRequest.json({error: "User already exists"}, {status:400});
        }


    }
    catch(error){
        return NextResponse.json({error:error.message},{status:500});
    }

}






