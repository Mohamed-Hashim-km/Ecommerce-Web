import express from "express";
import { createOrder, getMyOrders, getOrderByID, getOrders, orderDeliver, updateOrderPayment } from "../controllers/orderControllers.js";
import { admin, protect } from "../middleWares/authMiddleWare.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getOrders)
router.route("/mine").get(protect, getMyOrders);


router.route("/:id").get(protect, getOrderByID).put(protect,admin,orderDeliver);
router.route("/:id/pay").put(protect,updateOrderPayment);


export default router;
