import JWT from "jsonwebtoken";

export const tokenmiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        // Check if the Authorization header is present
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                success: false,
                message: "Authorization header is missing or invalid",
            });
        }

        const token = authHeader.split(" ")[1];  // Get the token part of the Authorization header

        // Verify the token
        JWT.verify(token, process.env.SECRET_KEY, (error, decode) => {
            if (error) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized User",
                });
            } else {
                req.body.id = decode.id;
                next();
            }
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
