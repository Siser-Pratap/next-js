import { NextResponse } from "next/server";
import { getDataFromToken } from "../../../helpers/getDataFromToken";
import {User} from "../../../models/userModel.js";

export async function GET(req){
    try {

        const userId = getDataFromToken(req);
        const newUser = User.findOne({_id: userId}).select("-password");
        return NextResponse.json({message:"User found", data:newUser});
        
        
    } catch (error) {
        return NextResponse.json({error:error.message}, {status:400});
    }
}