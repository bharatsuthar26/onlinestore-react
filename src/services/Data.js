import axios from "axios";
import jwt_decode from "jwt-decode";
const apiURL = "http://localhost:3001/api/v1/";
function postLogin(data) {
  return axios.post(`${apiURL}auth`, data);
}
function postRegis(data) {
  console.log(data);
  return axios.post(`${apiURL}users`, data);
}
function isLoggedIn() {
  let data = localStorage.getItem("_token");
  if (!data) {
    return false;
  } else {
    return true;
  }
}
function getToken() {
  return localStorage.getItem("_token");
}
function getUser() {
  try {
    return jwt_decode(localStorage.getItem("_token"));
  } catch (e) {
    return null;
  }
}
function isAdmin() {
  return !getUser() ? false : getUser().isAdmin;
}
function doLogout() {
  localStorage.removeItem("_token");
  window.location = "/";
}
function postAddProduct(data) {
  return axios.post(`${apiURL}products`, data);
}
function getProducts() {
  return axios.get(`${apiURL}products`);
}
function getProductById(id) {
  return axios.get(`${apiURL}products/${id}`);
}
function deleteProduct(id) {
  return axios.delete(`${apiURL}products/${id}`);
}
export {
  postLogin,
  postRegis,
  isLoggedIn,
  getToken,
  getUser,
  isAdmin,
  doLogout,
  postAddProduct,
  getProducts,
  getProductById,
  deleteProduct,
};