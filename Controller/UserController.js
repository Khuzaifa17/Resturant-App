import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";

export const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById({
            _id: req.body.id
        })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        user.password = undefined;
        return res.status(200).json({
            success: true,
            message: "User Get successfully",
            User: user
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in getting User API",
            error: error.message
        })
    }
}

export const updateUsercontroller = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate({ _id: req.body.id })

        //validation
        const { username, address, phone } = req.body
        if (username) user.username = username;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        await user.save();
        res.status(200).send({
            success: true,
            message: "User date is updates Successfully",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in updating User API",
            error: error.message
        })
    }
}

export const UpdatePasswordController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            res.status(500).send({
                success: false,
                message: "Please enter both old and new password",
            });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            res.status(500).send({
                success: false,
                message: "Old password is incorrect",
            });
        }
        var salt = bcrypt.genSaltSync(10);
        const hashpassword = await bcrypt.hash(newPassword, salt);
        user.newPassword = hashpassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password is updated Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating Password",
            error: error.message
        });
    }
}

export const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        if (!email || !newPassword || !answer) {
            res.status(500).send({
                success: false,
                message: "Please Provide all Fields",
                error: error.message
            });
        }

        const user = await userModel.findOne({ email, answer });
        if (!user) {
            res.status(500).send({
                success: false,
                message: "User not found",

            });
        }
        var salt = bcrypt.genSaltSync(10);
        const hashpassword = await bcrypt.hash(newPassword, salt);
        user.password = hashpassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password is Reset Successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in updating Password",
            error: error.message,
        });
    }
}

export const deleteuserController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "User Deleted Successfully",
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Deleting User",
            error: error.message
        });
    }
}