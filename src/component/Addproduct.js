import { Button, Container } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { postAddProduct } from "../services/Data";
import { addProdSchema } from "../schema/addprod";
import { useFormik } from "formik";
const Swal = require("sweetalert2");

const initialAddlValues = {
  name: "",
  category: "",
  price: "",
  description: "",
  manufacturer: "",
  availableItems: "",
  imagePath: null,
};
function Addproduct() {
  const { values, errors, onChange, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: initialAddlValues,
      validationSchema: addProdSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });
  console.log(errors);

  const navigate = useNavigate();
  const [state, setState] = useState({
    errMsg: "",
    succMsg: "",
    imagePath: "",
  });
  const uploadImage = (event) => {
    if (event.target.files.length > 0) {
      setState({ ...state, imagePath: event.target.files[0] });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.imagePath != "") {
      if (
        state.imagePath.type == "image/jpg" ||
        state.imagePath.type == "image/jpeg" ||
        state.imagePath.type == "image/png"
      ) {
        // when we upload any attachment we can send the data with FormData
        const data = new FormData(event.currentTarget);
        const senddata = new FormData();
        senddata.append("name", data.get("name"));
        senddata.append("category", data.get("category"));
        senddata.append("price", data.get("price"));
        senddata.append("description", data.get("description"));
        senddata.append("manufacturer", data.get("manufacturer"));
        senddata.append("availableItems", data.get("availableItems"));
        senddata.append("attach", state.imagePath);
        postAddProduct(senddata).then((res) => {
          if (res.data.err == 0) {
            setState({ ...state, succMsg: res.data.msg });
            setTimeout(() => {
              navigate("/products");
            }, 2000);
            Swal.fire({
              title: "Success",
              text: "Product Added Successfully",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
          if (res.data.err == 1) {
            setState({ ...state, errMsg: res.data.msg });
            Swal.fire({
              title: "Error",
              text: "",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        });
      } else {
        setState({ ...state, errMsg: "Only support Jpg and Png Image" });
        Swal.fire({
          title: "Type Error",
          text: "Only support Jpg and Png Image",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      setState({ ...state, errMsg: "Please select a image" });
      Swal.fire({
        title: "",
        text: "Please select a image",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  return (
    <Container>
      <h2 className="text-center mb-4 mt-3">Add Product</h2>
      <div className="d-flex justify-content-center">
        <Form className="w-50" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Product Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {errors.name && touched.name ? (
            <p className="text-danger">{errors.name}</p>
          ) : (
            ""
          )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Category <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Category"
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {errors.category && touched.category ? (
            <p className="text-danger">{errors.category}</p>
          ) : (
            ""
          )}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Price <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Price"
              name="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {errors.price && touched.price ? (
            <p className="text-danger">{errors.price}</p>
          ) : (
            ""
          )}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Description <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {errors.description && touched.description ? (
            <p className="text-danger">{errors.description}</p>
          ) : (
            ""
          )}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Manufacturer <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Manufacturer"
              name="manufacturer"
              value={values.manufacturer}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {errors.manufacturer && touched.manufacturer ? (
            <p className="text-danger">{errors.manufacturer}</p>
          ) : (
            ""
          )}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Available Items <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Available Items"
              name="availableItems"
              value={values.availableItems}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {errors.availableItems && touched.availableItems ? (
            <p className="text-danger">{errors.availableItems}</p>
          ) : (
            ""
          )}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Image <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="file"
              placeholder="Image"
              name="image"
              value={values.imagePath}
              onChange={handleChange}
              onBlur={uploadImage}
            />
          </Form.Group>
          {errors.image && touched.image ? (
            <p className="text-danger">{errors.image}</p>
          ) : (
            ""
          )}

          <Button className="w-100 p-2 mb-5" variant="primary" type="submit">
            ADD PRODUCT
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Addproduct;
