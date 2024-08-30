
import mongoose, { Mongoose } from "mongoose";

const OrderScheme = new mongoose.Schema({

    food: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Foods'
        }
    ],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['preparing', 'prepare', 'on the way', 'deliver'],
        default: "preparing",
    }
},
    {
        timestamps: true
    }

);

const Order = mongoose.model("Orders", OrderScheme);

export default Order;