import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { getProductById } from "../services/Data";

function Viewproduct() {
  const { proData, setProdata } = useState([]);
  const params = useParams();
  useEffect(() => {
    getProductById(params)
      .then((res) => {
        if (res.data.err == 0) {
          console.log(res.data);
          setProdata(res.data);
          console.log(setProdata);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <Card.Img variant="top" src={proData.image} />
        </Col>
        <Col>
          <h2>{proData.name}</h2>
        </Col>
      </Row>
    </Container>
  );
}

export default Viewproduct;
