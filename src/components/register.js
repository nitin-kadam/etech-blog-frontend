/* eslint-disable */
import { useState, React, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { register } from "../services/auth";
import MyToast from "./toast";
import { useNavigate } from "react-router-dom";

function Register({}) {
  const navigate = useNavigate();
  const [msg, setMsg] = useState({ color: "", isShow: false, msgInfo: "" });
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleRegister = (event) => {
    event.preventDefault();
    //handle add user
    register(
      inputs.firstName,
      inputs.lastName,
      inputs.email,
      inputs.password
    ).then((res) => {
      if (res.data.success === true) {
        setMsg((prevState) => ({
          ...prevState,
          color: "success",
          ishow: true,
          msgInfo: res.data.message,
        }));
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    });
  };

  return (
    <>
      <MyToast type={msg.color} isShow={msg.ishow} msgInfo={msg.msgInfo} />
      <Col className="p-4 mx-auto col-10 col-md-8 col-lg-6 shadow p-3 mb-5 bg-white rounded">
        <p className="text-center fw-bold fs-5">Register</p>
        <hr />
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-2" controlId="title">
            <Form.Label className="fw-bold">First Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              value={inputs.firstName}
              onChange={handleChange}
              placeholder="enter first name"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="content">
            <Form.Label className="fw-bold">Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="lastName"
              onChange={handleChange}
              placeholder="enter last name"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="content">
            <Form.Label className="fw-bold">Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="enter your email"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="content">
            <Form.Label className="fw-bold">Pasword</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="enter password"
            />
          </Form.Group>
          {/* <Form.Group className="mb-2" controlId="content">
        <Form.Label>Date</Form.Label>
        <Form.Control type="text" placeholder="content" />
      </Form.Group> */}

          <Button variant="dark" type="submit">
            Register
          </Button>
        </Form>
      </Col>
      ;
    </>
  );
}

export default Register;
