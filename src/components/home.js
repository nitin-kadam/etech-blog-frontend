/* eslint-disable */
import { useState, React, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Header from "./header";
import Blog from "./blog";
import Search from "./search";
import MyToast from "./toast";

import { getAllBlogs, searchBlogsByKeywordOrAuthor } from "../services/blog";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

function Home({}) {
  const [blogs, setBlogs] = useState();
  const [keyword, setKeyword] = useState();
  const [msg, setMsg] = useState({ color: "", isShow: false, msgInfo: "" });
  useEffect(() => {
    getAllBlogs().then((res) => {
      let result = res.data;
      //   console.log("result:", result);
      if (result.success === true) {
        setBlogs(result.posts);
        // alert(result.message);
        setMsg((prevState) => ({
          ...prevState,
          color: "success",
          ishow: true,
          msgInfo: res.data.message,
        }));

        // setTimeout(() => {
        //   navigate("/home");
        // }, 1000);
      }
    });
  }, []);

  const handleSearch = () => {
    searchBlogsByKeywordOrAuthor(keyword, keyword, keyword).then((res) => {
      console.log("research res:", res);
      setMsg((prevState) => ({
        ...prevState,
        color: "success",
        ishow: true,
        msgInfo: res.data.message,
      }));

      setBlogs(res.data.data);
    });
  };

  return (
    <>
      <MyToast type={msg.color} isShow={msg.ishow} msgInfo={msg.msgInfo} />
      <Header />
      <h3 className="mb-4 text-muted">Welcome to the BlogPoint!</h3>
      <InputGroup>
        <Form.Control
          name="keyword"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="search for title or author"
        />
        <Button variant="dark" id="button-addon2" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>
      <Container>
        <h5 className="m-2">Blogs</h5>
        <div className="row">
          {blogs?.map((el, id) => {
            return (
              <div className="col-md-6" key={id}>
                <Blog item={el} />
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}

export default Home;
