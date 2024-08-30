import OrderModel from "../Models/OrderModel.js"
export const PlaceOrderController = async (req, res) => {
    try {
        const { cart } = req.body;
        if (!cart) {
            res.status(500).json({
                success: false,
                message: "Please add Food Cart or Payment method"
            })
        }
        let total = 0;
        cart.map((i) => {
            total += i.Price
        });
        const newOrder = await OrderModel({
            foods: cart,
            payment: total,
            buyer: req.body.id,
        });
        await newOrder.save();
        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            newOrder,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in Placing Order Api",
            error: error.message
        });
    }

}
export const OrderStatusController = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            res.status(500).json({
                success: false,
                message: "Please provide Order Id"
            });
        }
        const { status } = req.body;
        const order = await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        if (!order) {
            res.status(404).json({
                success: false,
                message: "Order Not Found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Order Status Updated"
        })
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Error in Order Status Api",
                error: error.message
            }
        )
    }
}