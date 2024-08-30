import mongoose from "mongoose";


const foodscheme = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Food title is required"],
        },
        description: {
            type: String,
            required: [true, "Food description is required"]
        },
        foodTags: {
            type: String,
        },
        Price: {
            type: Number,
            required: [true, "Food price is required"]
        },
        image: {
            type: String,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.behance.net%2Fsearch%2Fprojects%2Ffood%2520logo&psig=AOvVaw0cKx5S5s71o4bINNZNygMY&ust=1724827929888000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNiQrvLKlIgDFQAAAAAdAAAAABAE",
        },
        category: {
            type: String,
        },
        code: {
            type: String,
        },
        isAvailable: {
            type: Boolean,
        },
        resturant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resturant",
        },
        rating: {
            type: Number,
            default: 5,
            min: 1,
            max: 5,
        },
        ratingCount: {
            type: String,

        }
    },
    {
        timestamps: true
    }
);

const food = mongoose.model("Foods", foodscheme);
export default food;