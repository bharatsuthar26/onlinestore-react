import { Button, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { getProductById } from "../services/Data";
import { addProdSchema } from "../schema/addprod";
import { useFormik } from "formik";
const Swal = require("sweetalert2");

function EditProduct(id) {
  const [proData, setProdata] = useState([]);
  useEffect(() => {
    getProductById(id)
      .then((res) => {
        if (res.data.err == 0) {
          console.log(res.data);
          setProdata(res.data.prodata);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container>
      <h2 className="text-center mb-4 mt-3">Edit Product</h2>
      <div className="d-flex justify-content-center">
        <Form className="w-50">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" name="name" value={proData.name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={proData.category}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" name="price" value={proData.price} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={proData.description}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Manufacturer</Form.Label>
            <Form.Control
              type="text"
              name="manufacturer"
              value={proData.manufacturer}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Available Items</Form.Label>
            <Form.Control
              type="text"
              name="availableItems"
              value={proData.availableItems}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" value={proData.imagePath} />
          </Form.Group>

          <Button className="w-100 p-2 mb-5" variant="primary" type="submit">
            EDIT PRODUCT
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default EditProduct;
