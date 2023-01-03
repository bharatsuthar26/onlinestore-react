import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { isAdmin, isLoggedIn } from "../services/Data";
import { Link } from "react-router-dom";

function ProductList({ prodata, deletePro }) {
  return (
    <Card style={{ width: "18rem", height: "21rem", marginBottom: "2rem" }}>
      <Link to={`/viewproduct/${prodata._id}`}>
        <Card.Img
          variant="top"
          style={{ width: "18rem", height: "12rem" }}
          className="p-3"
          src={prodata.imageURL}
        />
      </Link>
      <Card.Body>
        <Link
          to={`/viewproduct/${prodata._id}`}
          style={{ textDecoration: "none" }}
        >
          <Card.Title>{prodata.name}</Card.Title>
        </Link>

        <Card.Text>₹ {prodata.price}</Card.Text>

        {isLoggedIn() && (
          <>
            <Button variant="dark">Add to Cart</Button>
          </>
        )}
        {isAdmin() && (
          <>
            <Link to={`/editproduct/${prodata._id}`}>
              <Button variant="primary mx-1">Edit</Button>
            </Link>

            <Button
              className="mx-1 btn btn-danger"
              varient="danger"
              onClick={() => deletePro(prodata._id)}
            >
              Delete
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductList;
