import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: { address: "", city: "", postalCode: "", country: "" }, paymentMethod: "" };
// const addDecimal = (num) => {
//   return num.toFixed(2);
// };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x._id == item._id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) => {
          return x._id == existingItem._id ? item : x;
        });
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // //calculate Item Price
      // state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

      // //calculate the shipping price if the item greaterthan 100 shipping charge is free else shipping charge is 10
      // state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 100);

      // // calculating tax price tax is 15% if the item price
      // state.taxPrice = addDecimal(state.itemsPrice * 0.15);

      // //calculating total price
      // state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice

      // localStorage.setItem("cart", JSON.stringify(state));

      return updateCart(state);
    },
    deleteCart: (state, action) => {
      const item = action.payload;

      state.cartItems = state.cartItems.filter((x) => {
        return x._id !== item;
      });

      // state.itemsPrice=state.cartItems.reduce((acc,item)=>acc+item.price*item,0)
      // state.shippingPrice=addDecimal((state.itemsPrice>100?0:100))
      // state.taxPrice=addDecimal((state.itemsPrice*0.15))
      // state.totalPrice=state.itemsPrice+state.shippingPrice+state.taxPrice
      // localStorage.clear()

      // localStorage.setItem("cart", JSON.stringify(state));
      return updateCart(state);
    },
    resetCart: (state) => (state = initialState),

    saveAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    paymentHandler: (state, action) => {
      state.paymentMethod =action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItmes: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const cartSliceReducer = cartSlice.reducer;
export const { addCart, deleteCart, resetCart, saveAddress, paymentHandler, clearCartItmes } = cartSlice.actions;
