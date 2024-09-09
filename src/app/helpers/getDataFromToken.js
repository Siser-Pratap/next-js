//used to get the current user identity


export const getDataFromToken = (req) => {

    try {

        const token = req.cookies.get("token")?.value || "";
        //helps in decodind of token
        const decodedToken = token.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.id;
        
    } catch (error) {
        throw new Error("Error occured", error.message);
    }
}