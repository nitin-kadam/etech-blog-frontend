/* eslint-disable */
import { useState, React, useEffect } from "react";
import Card from "react-bootstrap/Card";
import moment from "moment";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteBlog } from "../services/blog";
import { getCurrentUser } from "../services/auth";
import MyToast from "./toast";

function Blog({ item, isMyBlog }) {
  const navigate = useNavigate();
  // let myItem = item;
  const [msg, setMsg] = useState({ color: "", isShow: false, msgInfo: "" });
  const user = getCurrentUser();
  const handleDeleteBlog = () => {
    deleteBlog(item._id).then((res) => {
      console.log("del", res);
      if (res.data.success === true) {
        setMsg((prevState) => ({
          ...prevState,
          color: "success",
          ishow: true,
          msgInfo: res.data.message,
        }));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  };
  return (
    <>
      <MyToast type={msg.color} isShow={msg.ishow} msgInfo={msg.msgInfo} />
      <Card
        className="shadow p-1 mb-5 bg-body-tertiary rounded"
        style={{ width: "30rem" }}
      >
        <Card.Header>
          <Card.Title>{item?.title}</Card.Title>
          {/* <p>{item?.createdAt}</p> */}
          {isMyBlog === true ? (
            <Card.Text style={{ marginLeft: "340px", cursor: "pointer" }}>
              <Badge
                onClick={() => navigate(`/editblog/${item?._id}`)}
                style={{ marginRight: "5px" }}
                pill
                bg="success"
              >
                edit
              </Badge>
              <Badge onClick={handleDeleteBlog} pill bg="danger">
                delete
              </Badge>
            </Card.Text>
          ) : (
            ""
          )}
        </Card.Header>
        <Card.Body>
          <Card.Text>{item?.content}</Card.Text>
          {/* <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link> */}
        </Card.Body>
        <Card.Footer>
          <Card.Text>
            by
            <cite
              className="m-1 fw-bold"
              title={`${item?.author?.firstName} ${item?.author?.lastName}`}
            >
              {`${item?.author?.firstName} ${item?.author?.lastName}`}
            </cite>
            <cite className="text-muted fs-6" style={{ marginLeft: "150px" }}>
              {moment(item?.createdAt).format("MMM Do YYYY, h:mm a")}
            </cite>
          </Card.Text>
        </Card.Footer>
      </Card>
    </>
  );
}

export default Blog;
