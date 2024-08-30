import mongoose from "mongoose";

export const connectDb = async (req, res) => {
    try {
        await mongoose.connect("mongodb+srv://khuzaifaafridi17:De2QsJHX5wzlY1Sj@cluster0.lksbd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDB is Connected");
    } catch (error) {
        console.log("MongoDB is not Connected", error);

    }
}

export default connectDb;