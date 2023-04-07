import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const register = (firstName, lastName, email, password) => {
  return axios.post(API_URL + "register", {
    firstName,
    lastName,
    email,
    password,
  });
};

export const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      console.log("res::", response);
      if (response.data["auth-token"]) {
        let userWithAuth = {
          ...response.data.user,
          "auth-token": response.data["auth-token"],
        };

        localStorage.setItem("user", JSON.stringify(userWithAuth));
      }

      return response.data;
    });
};

export const logout = () => {
  window.location.href = "/login";
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// const AuthService = {
//   register,
//   login,
//   logout,
//   getCurrentUser,
// };
