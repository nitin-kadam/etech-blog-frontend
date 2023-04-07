/* eslint-disable */
import { useState, React, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Blog from "./blog";
import MyToast from "./toast";
import { getBlogByAuthorId } from "../services/blog";
import { getCurrentUser } from "../services/auth";
function MyBlogs({}) {
  const [myBlogs, setMyBlogs] = useState([]);
  const [msg, setMsg] = useState({ color: "", isShow: false, msgInfo: "" });
  const user = getCurrentUser();
  useEffect(() => {
    getBlogByAuthorId(user?._id).then((res) => {
      setMsg((prevState) => ({
        ...prevState,
        color: "success",
        ishow: true,
        msgInfo: res.data.message,
      }));
      setMyBlogs(res.data.data);
    });
  }, []);
  return (
    <>
      <MyToast type={msg.color} isShow={msg.ishow} msgInfo={msg.msgInfo} />
      <Container>
        <h5>My Blogs</h5>
        <div className="row">
          {myBlogs?.map((el, id) => {
            return (
              <div className="col-md-6" key={id}>
                <Blog item={el} isMyBlog={true} />
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}

export default MyBlogs;
