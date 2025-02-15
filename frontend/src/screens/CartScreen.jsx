import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addCart, deleteCart } from "../slices/cartSlice";
import Message from "../components/Message";
import { useState } from "react";

const CartScreen = () => {
  const [qty, setQty] = useState();

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (product, qty) => {
    dispatch(addCart({ ...product, qty }));
  };

  const removeCartHandler = (id) => {
    dispatch(deleteCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={`http://localhost:5000${item.image}`} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control as="select" value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    {/* <Form.Control as="select" value={item.qty} onChange={(e) => setQty(e.target.value)}>
                            {[...Array(item.qty).keys()].map((x) => {
                              return (
                                <option key={x + 1} value={x}>
                                  {x + 1}
                                </option>
                              );
                            })}
                          </Form.Control> */}
                    <Button type="button" variant="light" onClick={() => removeCartHandler(item._id)}>
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items</h2>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={checkoutHandler} type="button" className="btn-block" disabled={cartItems.length === 0}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
