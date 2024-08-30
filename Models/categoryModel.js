import mongoose, { Schema } from "mongoose";

export const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Category Title is Required"],
    },
    image: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.behance.net%2Fsearch%2Fprojects%2Ffood%2520logo&psig=AOvVaw0cKx5S5s71o4bINNZNygMY&ust=1724827929888000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNiQrvLKlIgDFQAAAAAdAAAAABAE",
    }
},
    {
        timestamps: true,
    }
);

const category = mongoose.model("Category", categorySchema);
export default category;