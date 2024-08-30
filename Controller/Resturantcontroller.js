import resturant from "../Models/resturantModel.js";
import resturantModel from "../Models/resturantModel.js";

export const CreateResturantController = async (req, res) => {
    try {
        const { title, imageUrl, foods, time, delivery, pickup, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body;
        if (!title || !coords) {
            res.send(500).send({
                success: false,
                message: "Missing fields required "
            });
        }
        const newResturant = await resturantModel({
            title, imageUrl, foods, time, delivery, pickup, isOpen, logoUrl, rating, ratingCount, code, coords
        });
        await newResturant.save();
        res.status(200).send({
            success: true,
            message: "Resturant created successfully",
            data: newResturant,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            messgae: "Error in Getting Api",
            error: error.message
        });
    }
}
export const getResturantController = async (req, res) => {
    try {

        const resturants = await resturantModel.find({});
        if (!resturants) {
            res.status(500).send({
                success: false,
                message: "No Resturant Found",
            });
        }
        res.status(200).send({
            success: true,
            totalCount: resturants.length,
            resturant: resturants,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Getting Api",
            error: error.message
        });
    }
}
export const getResturantControllerbyID = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            res.status(404).send({
                success: false,
                message: "Resturant Not Found",
            });
        }
        const resturant = await resturantModel.findById(resturantId);
        if (!resturant) {
            res.status(500).send({
                success: false,
                message: "No Resturant Found by this ID",
            })
        }
        res.status(200).send({
            success: true,
            resturant: resturant
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error get Resturant API by ID",
        });
    }
}

export const DeleteResturantController = async (req, res) => {

    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            res.status(404).send({
                success: false,
                message: "Resturant Not Found",
            });
        }
        const resturant = await resturantModel.findByIdAndDelete(resturantId);
        if (!resturant) {
            res.status(404).send({
                success: false,
                message: "Resturant Not Found",
            })
        }
        res.status(200).send({
            success: true,
            message: "Resturant Deleted Successfully",
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Delete Resturant API",
            error: error.message,
        });
    }
}