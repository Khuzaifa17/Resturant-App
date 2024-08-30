import express, { Router } from "express";
import { CreateResturantController, DeleteResturantController, getResturantController, getResturantControllerbyID } from "../Controller/Resturantcontroller.js";
import { tokenmiddleware } from "../middleware/authmiddleware.js";

const resturantRoutes = express.Router();

resturantRoutes.post("/Register", tokenmiddleware, CreateResturantController);
resturantRoutes.get("/GetResturant", getResturantController);
resturantRoutes.get("/GetResturant/:id", getResturantControllerbyID);
resturantRoutes.delete("/DeleteResturant/:id", tokenmiddleware, DeleteResturantController);

export default resturantRoutes;