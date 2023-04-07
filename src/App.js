// import { Routes, Route, Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
// import MyToast from "./components/toast";
import "./index.css";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import MyBlogs from "./components/myBlogs";
import AddEditBlogForm from "./components/addEditBlogForm";
// import { useEffect, useState } from "react";
// import { getCurrentUser } from "./services/auth";

function App() {
  return (
    <>
      {/* <MyToast type={"danger"} isShow={true} /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/postblog" element={<AddEditBlogForm />} />
        <Route path="/editblog/:id" element={<AddEditBlogForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
