import bcrypt from "bcryptjs";
import userModel from "../Models/userModel.js";
import JWT from "jsonwebtoken";



export const registerController = async (req, res) => {
    try {
        const { email, password, username, phone, address, answer } = req.body
        if (!email || !password || !username || !phone || !address || !answer) {
            return res.status(500).send({
                success: false,
                message: "please Fill the all Provided Field"
            })
        }

        const exsistinguser = await userModel.findOne({ email })
        if (exsistinguser) {
            res.send(500).send({
                success: false,
                message: "User is already exist , please login"
            })
        }

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({ email, password: hashedPassword, phone, address, username, answer })
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error registering user ",
            error: error.message,
        })
    }
}

export const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validationnpm i jsonwebtoken
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide email and password",
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid password",
            });
        }

        // token Creating
        const token = JWT.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: '7d',

        });
        // Successful login
        res.status(200).send({
            success: true,
            message: "Login successfully",
            token,
            user,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in login API",
            error: error.message,
        });
    }
};