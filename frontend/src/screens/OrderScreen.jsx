import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import { useGetOrderByIdQuery, useOrderDeliverMutation } from "../slices/orderApiSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";


const OrderScreen = () => {
    const {id}=useParams()
   
    

    const [isDelivered,setIsDelivered]=useState()
    


    const { isLoading, data:order, error,refetch } =useGetOrderByIdQuery(id);


    const {userInfo}=useSelector((state)=>state.auth)
    
const [isDeliverHandler]=useOrderDeliverMutation()

     const orderDeliverHandler=async()=>{
      
      try {
        await isDeliverHandler(id).unwrap()
        toast.success("Deliverd")
        refetch();
      } catch (error) {
        toast.error(error?.data?.message)
      }
       
     }
    
 

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order?.user?.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order?.user?.email}`}>{order?.user?.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {order.shippingAddress.postalCode},{order.shippingAddress.country}
              </p>
              {order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message> : <Message variant="danger">Not Delivered</Message>}
             {userInfo?.isAdmin?<Button type="button" onClick={orderDeliverHandler}>Order Delever</Button>:""}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> : <Message variant="danger">Not Paid</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={`http://localhost:5000${item.image}`} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* PAY ORDER PLACEHOLDER */}
              {/* {MARK AS DELIVERED PLACEHOLDER} */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
