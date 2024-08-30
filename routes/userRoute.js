import express from "express";
import { deleteuserController, getUserController, resetPasswordController, UpdatePasswordController, updateUsercontroller } from "../Controller/UserController.js";
import { tokenmiddleware } from "../middleware/authmiddleware.js";


const userRouter = express.Router();

// Get User Data || GET
userRouter.get("/getUser", tokenmiddleware, getUserController);

// Update User Data || PUT
userRouter.put("/update", tokenmiddleware, updateUsercontroller);

// Update Password of User || POST
userRouter.post("/updatePassword", tokenmiddleware, UpdatePasswordController);

// Reset Password
userRouter.post("/resetPassword", tokenmiddleware, resetPasswordController);

//Delete User
userRouter.delete("/deleteUser/:id", tokenmiddleware, deleteuserController);

export default userRouter;