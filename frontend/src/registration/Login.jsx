import React, { useEffect, useState } from "react";
import { Button, Col, Form, Nav, NavDropdown, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/Formcontainer";
import { useLoginMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";

function LoginScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const { search } = useLocation(); //
  console.log("serch",search);
  
  const sp = new URLSearchParams(search);
  console.log("sp",sp);
  
  const redirect = sp.get("redirect") || "/";
  console.log("redirect",redirect);
  

  useEffect(()=>{
    if(userInfo){
      navigate(redirect);
    }
  },[userInfo,navigate,redirect])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };



  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to={`/sign/?redirect=${redirect}`}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
