import express from "express";
import { tokenmiddleware } from '../middleware/authmiddleware.js';
import { CreateCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from '../Controller/CatergoryControllers.js';
const categoryRoutes = express.Router();

categoryRoutes.post("/Create", tokenmiddleware, CreateCategoryController);
categoryRoutes.get("/Get", getCategoryController);
categoryRoutes.put("/Update/:id", tokenmiddleware, updateCategoryController);
categoryRoutes.delete("/delete/:id", tokenmiddleware, deleteCategoryController);

export default categoryRoutes;