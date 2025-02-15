import asyncHandler from "../middleWares/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = async (req, res) => {
  const pageSize = 4;
  const page = Number(req?.query?.pageNumber) || 1; //req coming page number

  const keywordCondition = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {}; //$regex select the keywordvalues  $options: "i" will match the keyword in any case
  const count = await Product.countDocuments({ ...keywordCondition }); // this will be take the database count of products

  const products = await Product.find({ ...keywordCondition })
    .limit(pageSize) // .limit(pageSize) this will be take the products from database with limit of 2
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

const getAllProducts = asyncHandler(async (req, res) => {

  const products = await Product.find(); //.populate('user','name email')
  if (products) {
    res.json(products);
  } else {
    throw new Error("Product not found");
  }
});

const getProductsById = asyncHandler(async (req, res) => {
  const products = await Product.findById(req.params.id);
  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProducts = asyncHandler(async (req, res) => {
  // const { name, image, brand, category, description, rating, numReviews, price, countInStock, reviews } = req.body;
  const product = await Product.create({
    name: "samplename",
    image: "/uploads/sample.jpg",
    user: req.user._id,
    brand: "samplebrand",
    category: "sample category",
    description: "sample description",
    rating: 0,
    numReviews: 0,
    price: 0,
    countInStock: 0,
  });
  const createdProducts = await product.save();
  res.status(201).json(createdProducts);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, rating, numReviews, price, countInStock } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.user = req.user._id;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.description = description || product.description;
    product.rating = rating || product.rating;
    product.numReviews = numReviews || product.numReviews;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const reviewProduct = asyncHandler(async (req, res) => {

  const { rating, comment, name } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find((review) => review.user.toString() == req.user._id.toString());

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      rating: Number(rating),
      comment,
      name,
      product,
      user: req.user._id,
    };

    if (review) {
      const puhsed = await product.reviews.push(review);

      product.numReviews = product.reviews.length;
      product.rating = product.reviews.reduce((acc, value) => acc + value.rating, 0) / product.reviews.length;

      const reviewedProducts = await product.save();

      res.status(201).json(reviewedProducts);
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, createProducts, getProductsById, updateProduct, deleteProduct, reviewProduct, getAllProducts };
