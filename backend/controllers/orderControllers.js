import asyncHandler from "../middleWares/asyncHandler.js";
import Order from "../models/orderModel.js";

const createOrder = async (req, res) => {
  const { cartItems, shippingAddress, paymentMethode, itemPrice, taxPrice, shippingPrice, totalPrice, paymentResult } = req.body;

  if (cartItems && cartItems.length == 0) {
    res.status(400);
    throw new Error("Cart is empty");
  } else {
    const order = new Order({
      orderItems: cartItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethode,
      itemPrice,
      paymentResult,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(200).json(createOrder);
  }
};

const getMyOrders = async (req, res) => {

  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

const getOrders = async (req, res) => {

  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
};

const getOrderByID = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email"); //this for that perticular id user name and email
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
};

const orderDeliver = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = new Date();
    await order.save();
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

const updateOrderPayment = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Payment Not Found");
  }
});

export { createOrder, getMyOrders, getOrderByID, getOrders, orderDeliver, updateOrderPayment };
