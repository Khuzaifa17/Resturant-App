import express from "express";
import { tokenmiddleware } from "../middleware/authmiddleware.js";
import { OrderStatusController, PlaceOrderController } from "../Controller/OrderContoller.js";
import { AdminMiddleware } from "../middleware/AdminMiddleware.js";

const OrderRoutes = express.Router();

OrderRoutes.post("/OrderFood", tokenmiddleware, PlaceOrderController);
OrderRoutes.post("/OrderStatus/:id", tokenmiddleware, AdminMiddleware, OrderStatusController);

export default OrderRoutes;
