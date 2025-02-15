const addDecimal = (num) => {
  return num.toFixed(2);
};

const updateCart = (state) => {
  state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

  //calculate the shipping price if the item greaterthan 100 shipping charge is free else shipping charge is 10
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 100);

  // calculating tax price tax is 15% if the item price
  state.taxPrice = addDecimal(state.itemsPrice * 0.15);

  //calculating total price
  state.totalPrice = Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};

export { updateCart };
