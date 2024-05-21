import { Mongoose } from "mongoose";
import { databaseName } from "../constants";

const dbConnection = async() => {
    try{
       const databaseInstance = await Mongoose.connect(`${process.env.MONGODB_URI}/${databaseName}`);
    }
    catch(error){
        console.log("Database Connection Failed");
    }
}

export default dbConnection;
