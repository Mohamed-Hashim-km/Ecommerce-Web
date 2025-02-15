//===========================it for we can add data in database manually===============================//

import connectDb from "./config/db.js";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import users from "./data/users.js";
import products from "./data/products.js";

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await User.deleteMany();

    await Product.deleteMany();

    const insertedUsers = await User.insertMany(users);

    const sampleProducts = products.map((products) => {
      return { ...products, user: insertedUsers[0]._id };
    });
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

importData();
