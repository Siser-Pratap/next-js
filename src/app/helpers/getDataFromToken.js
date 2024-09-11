//used to get the current user identity
import jwt from "jsonwebtoken";


export const getDataFromToken = (req) => {

    try {

        const token = req.cookies.get("token")?.value || "";
        // console.log(`Token: ${token}`);
        //helps in decoding of token
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("token is decoded");
        // console.log(decodedToken);
        // console.log(decodedToken.id);
        return decodedToken.id;
        
    } catch (error) {
        throw new Error("Error occured", error.message);
    }
}