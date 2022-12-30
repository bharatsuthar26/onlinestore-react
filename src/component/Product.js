import React, { useState, useEffect } from "react";
import { getProducts } from "../services/Data";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductList from "./ProductList";
import { deleteProduct } from "../services/Data";
const Swal = require("sweetalert2");

export default function Product() {
  const [proData, setProdata] = useState([]);
  useEffect(() => {
    getProducts()
      .then((res) => {
        if (res.data.err == 0) {
          console.log(res.data);
          setProdata(res.data.prodata);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePro = (id) => {
    deleteProduct(id).then((res) => {
      if (res) {
        Swal.fire("Product has been deleted successfully", "", "success");
        let data = proData.filter((pro) => pro._id != id);
        setProdata(data);
      }
    });
  };
  return (
    <div>
      <Container>
        <h2> All Products</h2>
        <Row>
          {proData?.map((pro) => (
            <Col sm={4} key={pro._id}>
              <ProductList prodata={pro} deletePro={deletePro} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
