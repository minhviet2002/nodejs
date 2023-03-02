const storage = require("node-persist");
const fetch = require("cross-fetch");
const bodyParser = require("body-parser");
const userController = require(".././routes/admin/users/index");
const categorieController = require(".././routes/admin/categories/index");
const productController = require(".././routes/admin/product/index");
const loginController = require(".././routes/auth/login/index");
const logoutController = require(".././routes/auth/logout/index");
const registerController = require(".././routes/auth/register/index");
const usersController = require("../controller/admin/usersController");
const isAdminController = require(".././config/middleware/isAdminController");
const isUserController = require(".././config/middleware/isUserController");
const CategorieModel = require(".././models/Categories/index");

// Khai báo User 
const productUserController = require(".././routes/user/product/index");
const cartUserController = require(".././routes/user/cart/index");

function route(app) {
  // support parsing of application/json type post data
  app.use(bodyParser.json());
  //support parsing of application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({ extended: true }));

  //Login
  app.use("/login", loginController);
  //Logout
  app.use("/logout", logoutController);
  //Register
  app.use("/register", registerController);

  // User ADMIN
  app.use("/admin/users", userController);
  // Categories ADMIN
  app.use("/admin/categories", categorieController);
  // Product ADMIN
  app.use("/admin/products", productController);

  // products USERS
  app.use("/products", productUserController);

  // Carts Users 
  app.use("/carts", cartUserController);

  //HOME

  app.use("/", isUserController.isUser, (req, res, next) => {
    if (res.data) {
      var userLogin = res.data;
      if (userLogin.role == 0) {
        var isUser = userLogin;
        Promise.all([CategorieModel.find({})]).then(([data]) => {
          var categories = data.map((category) => category.toObject());
          var products = [];
          var categorieList = categories;
          categories.find((category) => {
            category.products.find((data) => {
              products.push(data);
            });
          });
          return res.render("home", {
            userLogin,
            isUser,
            categories,
            categorieList,
            products,
          });
        });
      }
    }
  });
}

module.exports = route;
