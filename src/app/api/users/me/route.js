import { NextResponse } from "next/server";
import { getDataFromToken } from "../../../helpers/getDataFromToken";
import User from "../../../models/userModel";

export async function GET(req){
    try {

        const id = getDataFromToken(req);
        console.log(id);
        
        const newUser = await User.findOne({_id: id}).select("-password");
        // console.log(newUser);
        
        return NextResponse.json({message:"User found", data:newUser});
        
        
    } catch (error) {
        return NextResponse.json({error:error.message}, {status:400});
    }
}