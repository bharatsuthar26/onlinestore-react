import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormik } from "formik";
import * as Yup from "yup";
const Swal = require("sweetalert2");

function Regis() {
  const ValidationSchema = Yup.object().shape({
    firstname: Yup.string()
      .required("First name is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabates allowed"),
    lastname: Yup.string()
      .required("Last name is required")
      .matches(/^[a-zA-Z ]+$/, "Only alphabates allowed"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    contact: Yup.string()
      .required("Contact is required")
      .matches(/^[0-9]*$/, "Only numbers are allowed")
      .min(10, "Contact number should be 10 digit")
      .max(10, "Contact number should be 10 digit"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be atleast 8 characters")
      .max(16, "Password must not execeed 16 characters"),
    acceptTerms: Yup.bool().oneOf([true], "Accept term is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      contact: "",
      password: "",
      acceptTerms: false,
    },
    validationSchema: ValidationSchema,
    onSubmit: (data) => {
      console.log(data);
      Swal.fire({
        title: "Success",
        text: "Registered Successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    },
  });

  console.log(formik.errors);
  return (
    <Container>
      <h2 className="text-center mb-4 mt-3">Sign Up</h2>
      <div className="d-flex justify-content-center">
        <Form className="w-50" onSubmit={formik.handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                />
              </Form.Group>
              {formik.errors.firstname && formik.touched.firstname ? (
                <p className="text-danger">{formik.errors.firstname}</p>
              ) : (
                ""
              )}
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
              </Form.Group>
              {formik.errors.lastname && formik.touched.lastname ? (
                <p className="text-danger">{formik.errors.lastname}</p>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email Address"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Form.Group>
          {formik.errors.email && formik.touched.email ? (
            <p className="text-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contact"
              name="contact"
              onChange={formik.handleChange}
              value={formik.values.contact}
            />
          </Form.Group>
          {formik.errors.contact && formik.touched.contact ? (
            <p className="text-danger">{formik.errors.contact}</p>
          ) : (
            ""
          )}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Form.Group>
          {formik.errors.password && formik.touched.password ? (
            <p className="text-danger">{formik.errors.password}</p>
          ) : (
            ""
          )}

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Check me out"
              name="acceptTerms"
              onChange={formik.handleChange}
            />
          </Form.Group>
          {formik.errors.acceptTerms && formik.touched.acceptTerms ? (
            <p className="text-danger">{formik.errors.acceptTerms}</p>
          ) : (
            ""
          )}
          <Button className="w-100 p-2" variant="primary" type="submit">
            SIGN UP
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Regis;
