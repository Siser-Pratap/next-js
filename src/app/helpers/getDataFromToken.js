//used to get the current user identity


import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const getDataFromToken = (req) => {

    try {

        const token = req.cookies.get("token")?.value || "";
        const decodedToken = token.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.id;
        
    } catch (error) {
        throw new Error("Error occured", error.message);
    }
}