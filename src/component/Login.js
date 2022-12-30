import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { isAdmin, isLoggedIn, postLogin } from "../services/Data";
import { useNavigate } from "react-router-dom";
const Swal = require("sweetalert2");

function Login() {
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    postLogin(formData)
      .then((res) => {
        if (res.data.err == 0) {
          localStorage.setItem("_token", res.data.token);
          isLoggedIn();
          isAdmin();
          navigate("/products");
        }
        if (res.data.err == 1) {
          setErrMsg(res.data.msg);
          Swal.fire({
            title: "Invalid Crendentials",
            text: "Please Enter right crendentials",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <h2 className="text-center mt-3 mb-4">Login</h2>
      <div className="d-flex justify-content-center">
        <Form className="w-50" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>
          <Button variant="primary" className="w-100 mb-3" type="submit">
            Sign In
          </Button>
          <Link to="/regis">Already have an account? Sign in</Link>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
