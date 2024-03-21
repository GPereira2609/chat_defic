import mongoose from "mongoose";

require("dotenv").config()

export const connectMongoDB = async () => {
    if(mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise()
    }

return await mongoose.connect(process.env.MONGO_URI);
};