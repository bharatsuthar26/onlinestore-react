import { Button, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { getProductById } from "../services/Data";
import { addProdSchema } from "../schema/addprod";
import { useFormik } from "formik";
import { updateData } from "../services/Data";
const Swal = require("sweetalert2");

function EditProduct() {
  const [proData, setProdata] = useState([]);
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    getProductById(id)
      .then((res) => {
        if (res.data.err == 0) {
          setProdata(res.data.prodata);
        }
        // console.log(res.data);
      })

      .catch((err) => {
        // console.log(err)
      });
  }, []);

  const handler = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setProdata((prevData) => ({ ...prevData, [name]: value }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { _id } = proData;
    try {
      const response = await updateData(_id, proData);
      setTimeout(() => {
        navigate("/products");
      }, 1000);
      Swal.fire({
        title: "Success",
        text: "Product Edited Successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  return (
    <Container>
      <h2 className="text-center mb-4 mt-3">Edit Product</h2>
      <div className="d-flex justify-content-center">
        <Form className="w-50" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handler}
              value={proData.name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              onChange={handler}
              value={proData.category}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              onChange={handler}
              value={proData.price}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              onChange={handler}
              value={proData.description}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Manufacturer</Form.Label>
            <Form.Control
              type="text"
              name="manufacturer"
              onChange={handler}
              value={proData.manufacturer}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Available Items</Form.Label>
            <Form.Control
              type="text"
              name="availableItems"
              onChange={handler}
              value={proData.availableItems}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handler}
              value={proData.imagePath}
            />
          </Form.Group>
          <Card.Img
            variant="top"
            style={{ width: "10rem", height: "10rem" }}
            className="p-3"
            src={proData.imageURL}
          />

          <Button className="w-100 p-2 mb-5" variant="primary" type="submit">
            EDIT PRODUCT
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default EditProduct;
