import userModel from "../Models/userModel.js";

export const AdminMiddleware = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.id);
        if (!user.usertype !== "admin") {
            res.status(401).json({
                success: false,
                message: "Invalid user"
            })
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Un-Authorized Access",
        })
    }
}