import express from "express";
import { logincontroller, registerController } from "../Controller/authController.js";

const authrouter = express.Router();

//Register || POST
authrouter.post("/Register", registerController);

//Register || POST
authrouter.post("/login", logincontroller);

export default authrouter