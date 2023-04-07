import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const createBlog = (title, content, author) => {
  return axios.post(
    API_URL + "blogs/create",
    {
      title,
      content,
      author,
    },
    { headers: authHeader() }
  );
};
const updateBlog = (title, content, author, blogId) => {
  return axios.put(
    API_URL + `blogs/update/${blogId}`,
    {
      title,
      content,
      author,
    },
    { headers: authHeader() }
  );
};
const getAllBlogs = () => {
  return axios.get(API_URL + `blogs`);
};
const deleteBlog = (blogId) => {
  return axios.delete(API_URL + `blogs/delete/${blogId}`, {
    headers: authHeader(),
  });
};
const getBlogById = (blogId) => {
  return axios.get(API_URL + `blogs/getPostById/${blogId}`, {
    headers: authHeader(),
  });
};
const getBlogByAuthorId = (authId) => {
  return axios.get(API_URL + `blogs/getAllPostByAuthor/${authId}`, {
    headers: authHeader(),
  });
};
const searchBlogsByKeywordOrAuthor = (title, content, author) => {
  return axios.post(API_URL + `blogs/getAllPostByKeywordOrAuthor`, {
    title,
    content,
    author,
  });
};

// const blogService = {};

export {
  createBlog,
  updateBlog,
  getAllBlogs,
  deleteBlog,
  getBlogById,
  getBlogByAuthorId,
  searchBlogsByKeywordOrAuthor,
};
