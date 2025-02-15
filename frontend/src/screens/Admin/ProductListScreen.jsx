import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useCreateProductsMutation, useDeleteProductMutation, useGetAllProductsQuery } from "../../slices/productApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductListScreen = () => {

  const { data: products, isLoading, error, refetch } = useGetAllProductsQuery();
 
  
  const navigate = useNavigate();

  const [delteProduct] = useDeleteProductMutation();

  const [createProducts] = useCreateProductsMutation();

  const createProductHandler = async () => {
    try {
      await createProducts().unwrap();
      refetch();
      toast.success("Product created successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await delteProduct(id).unwrap();
      toast.success("Product Deleted");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const editHandler = async (id) => {
    navigate(`/editproducts/${id}`);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button onClick={createProductHandler} type="button" className="btn-sm m-3">
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button variant="light" className="btn-sm mx-2" onClick={() => editHandler(product._id)}>
                      <FaEdit />
                    </Button>

                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* PAGINATE PLACEHOLDER */}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
