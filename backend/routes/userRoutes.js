import express from "express"
import { authUser, createUser, deleteUser, editUser, getUserById, logout, updateUserProfile, users } from "../controllers/userControllers.js";
import { admin, protect } from "../middleWares/authMiddleWare.js";

const router=express.Router();

router.route("/").post(createUser).get(protect,admin,users)

router.route("/auth").post(authUser)
router.route("/logout").post(logout)
router.route("/updateprofile").put(protect,updateUserProfile)
router.route("/edit").put(protect,admin,editUser)

router.route("/:id").delete(protect,admin,deleteUser).get(protect,admin,getUserById)








export default router