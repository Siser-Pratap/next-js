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

        //hashed password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({username, email, password:hashedPassword});

        const savedUser = await newUser.save();

        console.log(savedUser);

        return NextRequest.json({message:"New user saved",success:true, savedUser});

    }
    catch(error){
        return NextResponse.json({error:error.message},{status:500});
    }

}






