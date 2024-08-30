import { model } from "mongoose";
import categoryModel from "../Models/categoryModel.js";

export const CreateCategoryController = async (req, res) => {
    try {
        const { title, image } = req.body;
        if (!title) {
            res.status(500).send({
                success: false,
                message: "Please fill all fields"
            });
        }
        const newcategory = await categoryModel({ title, image });
        await newcategory.save();
        res.status(201).send({
            success: true,
            message: "Category created successfully",
            category: newcategory,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || "Error in creating category",
        });

    }
}

export const getCategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        if (!categories) {
            res.status(500).send({
                success: false,
                message: "No categories found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Categories found successfully",
            categories: categories
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || "Error in getting category",
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, image } = req.body
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { title, image }, { new: true });
        if (!updatedCategory) {
            res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category: updatedCategory
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || "Error in updating category",
        });
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }
        const category = await categoryModel.findByIdAndDelete(categoryId);
        if (category) {
            res.status(500).send({
                success: false,
                message: "No Category Found with this Id",
            })
        }
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || "Error in deleting category",
        })
    }
}