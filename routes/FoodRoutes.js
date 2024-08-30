import express from "express";
import { tokenmiddleware } from '../middleware/authmiddleware.js';
import { CreatefoodController, deleteFoodController, getallfoodController, getFoodbyResturantController, getSingleFoodController, updateFoodController } from "../Controller/FoodController.js";

const foodroutes = express.Router();

foodroutes.post("/CreateFood", tokenmiddleware, CreatefoodController);
foodroutes.get("/getAllFoods", getallfoodController);
foodroutes.get("/getSingleFood/:id", getSingleFoodController);
foodroutes.get("/getbyResturant/:id", getFoodbyResturantController);
foodroutes.put("/UpdateFood/:id", tokenmiddleware, updateFoodController);
foodroutes.delete("/DeleteFood/:id", tokenmiddleware, deleteFoodController)


export default foodroutes;