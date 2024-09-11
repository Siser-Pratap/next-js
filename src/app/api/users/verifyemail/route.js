import { sendEmail } from "../../../helpers/mailer";
import User from "../../../models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { dbConfig } from "../../../dbConfig/dbConfig";

dbConfig();
console.log("Database connected");

export async function POST(req){
    try {

        const reqBody = await req.json();
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({verifyToken: token}, {verifyTokenExpiry: {$gt: Date.now()}});
        

        if(!user){
            NextResponse.json({message:"User not found"}, {status: 404});
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();


        return NextResponse.json({message:"Verified successfully"}, {status:200});
       

    } catch (error) {
        NextResponse.json({error: error.message}, {status:500});
    }
}