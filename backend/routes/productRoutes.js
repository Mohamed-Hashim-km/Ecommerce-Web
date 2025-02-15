import express from "express";
import { createProducts, deleteProduct, getAllProducts, getProducts, getProductsById, reviewProduct, updateProduct } from "../controllers/productControllers.js";
import { admin, protect } from "../middleWares/authMiddleWare.js";

const router = express.Router();
router.route("/").get(getProducts).post(protect, admin, createProducts); getAllProducts
router.route("/getAllProducts").get(protect,admin,getAllProducts);
router.route("/:id").get(getProductsById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct).post(protect, reviewProduct);

export default router;
