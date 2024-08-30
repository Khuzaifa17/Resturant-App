import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import connectDb from "./config/db.js";
import authrouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";
import resturantRoutes from "./routes/resturantRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import foodroutes from "./routes/FoodRoutes.js";
import OrderRoutes from "./Models/OrderRoutes.js";


// Configuration of Env
config();
connectDb();


// Initialize Express
const app = express();

// Middleware 
app.use(cors());
app.use(json());
app.use(morgan("dev"));

// Routes
app.use('/api/auth', authrouter);
app.use('/api/user', userRouter);
app.use('/api/resturant', resturantRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/food', foodroutes);
app.use('/api/Order', OrderRoutes);

// Port
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).send({ message: "Welcome to the Server" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
