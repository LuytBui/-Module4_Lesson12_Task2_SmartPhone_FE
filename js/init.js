let USERS_WEBSERVICE_ROOT = "http://localhost:8080/api/login";

let PRODUCTS_WEBSERVICE_ROOT = "http://localhost:8080/api/products";
let CATEGORIES_WEBSERVICE_ROOT = "http://localhost:8080/api/categories";
let FILES_WEBSERVICE_ROOT = "http://localhost:8080/api/files";
let IMAGE_FOLDER = "http://localhost:8080/image/";

let currentUser = sessionStorage.getItem("currentUser");
currentUser = JSON.parse(currentUser);