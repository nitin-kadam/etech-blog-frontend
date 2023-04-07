/* eslint-disable */
import { useState, React, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById, createBlog, updateBlog } from "../services/blog";
import MyToast from "./toast";
import { getCurrentUser } from "../services/auth";
function AddEditBlogForm({}) {
  const { id } = useParams();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [msg, setMsg] = useState({ color: "", isShow: false, msgInfo: "" });
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleAddEdit = (event) => {
    event.preventDefault();
    if (id) {
      //handle edit blog
      updateBlog(inputs.title, inputs.content, user._id, id).then((res) => {
        if (res.data.success === true) {
          setMsg((prevState) => ({
            ...prevState,
            color: "success",
            ishow: true,
            msgInfo: res.data.message,
          }));
          setTimeout(() => {
            navigate("/myblogs");
          }, 1000);
        }
      });
    } else {
      //handle add blog
      createBlog(inputs.title, inputs.content, user?._id).then((res) => {
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
    }
  };

  useEffect(() => {
    if (id) {
      getBlogById(id).then((res) => {
        let result = res.data.data;
        setInputs((prev) => ({
          ...prev,
          title: result.title,
          content: result.content,
        }));
      });
      // setMsg((prevState) => ({
      //   ...prevState,
      //   color: "success",
      //   ishow: true,
      //   msgInfo: res.data.message,
      // }));
    }
  }, []);
  return (
    <>
      <MyToast type={msg.color} isShow={msg.ishow} msgInfo={msg.msgInfo} />
      <Col className="p-4 mx-auto col-10 col-md-8 col-lg-6 shadow p-3 mb-5 bg-white rounded">
        <p className="text-center fw-bold fs-5">
          {id ? "Edit" : "Add"} Blog Post
        </p>
        <hr />
        <Form onSubmit={handleAddEdit}>
          <Form.Group className="mb-2" controlId="title">
            <Form.Label className="fw-bold">Title</Form.Label>
            <Form.Control
              required
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleChange}
              placeholder="Enter blog title"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="content">
            <Form.Label className="fw-bold">Content</Form.Label>
            <Form.Control
              required
              name="content"
              value={inputs.content}
              onChange={handleChange}
              as="textarea"
              placeholder="write content"
            />
          </Form.Group>
          {/* <Form.Group className="mb-2" controlId="content">
            <Form.Label>Date</Form.Label>
            <Form.Control type="text" placeholder="content" />
          </Form.Group> */}

          <Button variant="dark" type="submit">
            {id ? "Update" : "Add"}
          </Button>
        </Form>
      </Col>
    </>
  );
}

export default AddEditBlogForm;
