import mongoose, { Schema } from "mongoose";

export const resturantscheme = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Resturant Title is Required']
    },
    imageUrl: {
        type: String,
    },
    foods: {
        type: Array
    },
    time: {
        type: String
    },
    pickup: {
        type: Boolean,
        default: true
    },
    delivery: {
        type: Boolean,
        default: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    logoUrl: {
        type: String
    },
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: String
    },
    code: {
        type: String
    },
    coords: {
        id: { type: String },
        latitude: { type: Number },
        longitude: { type: Number },
        longitudeDelta: { type: Number },
        latitudeDelta: { type: Number },
        address: { type: String },
    }

},
    {
        timestamps: true
    }

);

const resturant = mongoose.model("Resturant", resturantscheme);
export default resturant;