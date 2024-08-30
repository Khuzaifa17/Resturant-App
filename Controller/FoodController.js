import foodModel from "../Models/FoodModel.js"

export const CreatefoodController = async (req, res) => {
    try {
        const { title, description, foodTags, Price, image, category, code, isAvailable, resturant, rating, ratingCount } = req.body;
        if (!title || !description || !resturant || !Price) {
            return res.status(500).send({
                success: false,
                message: "Please Fill the all field",
            });
        }
        const newfood = await foodModel({ title, description, foodTags, Price, image, category, code, isAvailable, resturant, rating, ratingCount });
        await newfood.save();
        res.status(201).send({
            success: true,
            message: "Food Created Successfully",
            newFooditem: newfood,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error Creating Food",
            error,
        })
    }
}
export const getallfoodController = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        if (!foods) {
            res.status(404).send({
                success: false,
                message: "Food Not Found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Food Found",
            length: foods.length,
            foods,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error getting All Food Products",
            error: error.message,
        });
    }
}
export const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        const food = await foodModel.findById(foodId);
        if (!food) {
            res.status(404).send({
                success: false,
                message: "Food not Found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Food Found",
            food,
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in getting Single Food Product API",
            error: error.message,
        });
    }
}

export const getFoodbyResturantController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            res.status(404).send({
                success: false,
                message: "Resturant ID is required",
            });
        }
        const foods = await foodModel.find({ resturant: resturantId });
        if (!foods) {
            res.status(404).send({
                success: false,
                message: "No Food Found for this Resturant",
            });
        }
        res.status(200).send({
            success: true,
            message: "Food Found for this Resturant",
            foods,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in getting Food by Restaurant API",
            error: error.message,
        })
    }
}

export const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            res.status(404).send({
                success: false,
                message: "Food ID is required",
            });
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            res.status(404).send({
                success: false,
                message: "Food Not Found",
            });
        }
        const { title, description, foodTags, Price, image, category, code, isAvailable, resturant, rating, ratingCount } = req.body
        const updatedFood = await foodModel.findByIdAndUpdate(foodId, { title, description, foodTags, Price, image, category, code, isAvailable, resturant, rating, ratingCount }, { new: true })
        res.status(201).send({
            success: true,
            message: "Food item was Updated",
            updatedFood,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Updating Food Api",
        })
    }
}
export const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            res.status(404).send({
                success: false,
                message: "Food ID is required",
            });
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            res.status(404).send({
                success: false,
                message: "Food Not Found With this Id",
            });
        }
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success: true,
            message: "Food Item is Deleted Successfully",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Deleting Food Api",
        })
    }
}
