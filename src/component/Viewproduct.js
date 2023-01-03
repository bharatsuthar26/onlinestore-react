import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useParams, Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { getProductById } from "../services/Data";

function Viewproduct() {
  const [proData, setProdata] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    getProductById(id)
      .then((res) => {
        console.log("res" + res.data);
        if (res.data.err == 0) {
          setProdata(res.data.prodata);
          console.log(proData.prodata);
        }
        console.log(res.data);
      })

      .catch((err) => console.log(err));
  }, []);
  return (
    <Container>
      <p className="mt-3">
        Home / {proData.category} / {proData.manufacturer} / {proData.name}
      </p>
      <Row className="mt-2">
        <Col>
          <Card.Img variant="top" className="w-75" src={proData.imageURL} />
          <br />
        </Col>
        <Col className="pl-5">
          <h2>{proData.name}</h2>
          <p>{proData.description}</p>
          <h4>₹ {proData.price}</h4>
          <p
            style={{
              fontFamily: "Andika, sans-serif",
              fontWeight: "500",
            }}
          >
            Includes all taxes
          </p>
          <p>SIZE : </p>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary">S</Button>
            <Button variant="secondary">M</Button>
            <Button variant="secondary">L</Button>
            <Button variant="secondary">XL</Button>
          </ButtonGroup>
          <br />
          <br />
          <p style={{ backgroundColor: "#f0d7d5" }}>
            10 days easy return and exchange applicable for this item
          </p>
          <Button variant="dark" size="lg">
            ADD TO CARD
          </Button>
          <br />
          <br />

          <Card>
            <Card.Body>
              <Card.Title>
                <i class="bi bi-patch-minus"></i> 1 Offer
              </Card.Title>
              <Card.Title style={{ color: "orange" }}> FLAT 50% OFF</Card.Title>

              <Card.Text>
                Buy Any 2 Or More Of NeoStore Group Products And Get 50% Off
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <div style={{ display: "flex" }}>
            <Card.Img
              src={
                "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB630870460_.png"
              }
              alt=""
            />
            <br />
            <p>Free Delivery</p>
            <Card.Img
              src={
                "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB485937110_.png"
              }
            />
            <br />
            <p>Pay On Delivery</p>
            <Card.Img
              src={
                "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png"
              }
            />
            <br />
            <p>10 Days Retunable</p>

            <Card.Img
              src={
                "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB485933725_.png"
              }
            />
            <br />
            <p>NeoStore Delivered</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Viewproduct;
