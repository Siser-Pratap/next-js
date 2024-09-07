import mongoose from "mongoose"

export const dbConfig = async() => {
  mongoose.set("strictQuery", true);

  mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("MongoDb Connected"))
    .catch((err)=>console.log(err));
  }
