/* eslint-disable */
import { useState, React, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MyToast from "./toast";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
function Login({}) {
  const navigate = useNavigate();
  const [msg, setMsg] = useState({ color: "", isShow: false, msgInfo: "" });
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login(inputs?.username, inputs.password).then(async (res) => {
      // console.log(res);
      if (res.success === true) {
        setMsg({
          color: "success",
          ishow: true,
          msgInfo: res.message,
        });
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (res.sucess === false) {
        setMsg({
          color: "danger",
          ishow: true,
          msgInfo: res.message,
        });
      }
    });
  };

  return (
    <>
      <MyToast type={msg.color} isShow={msg.ishow} msgInfo={msg.msgInfo} />
      <Col className="p-4 mx-auto col-10 col-md-8 col-lg-6 shadow p-3 mb-5 bg-white rounded">
        <p className="text-center fw-bold fs-5">Login</p>
        <hr />
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-2" controlId="title">
            <Form.Label className="fw-bold">Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="enter email"
              name="username"
              value={inputs.username || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="content">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="enter your password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
              maxLength={10}
            />
          </Form.Group>
          {/* <Form.Group className="mb-2" controlId="content">
        <Form.Label>Date</Form.Label>
        <Form.Control type="text" placeholder="content" />
      </Form.Group> */}

          <Button variant="dark" type="submit">
            Login
          </Button>
        </Form>
      </Col>
      ;
    </>
  );
}

export default Login;
