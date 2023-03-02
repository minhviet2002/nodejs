// const Categorie = require("../../models/Categories/index");
// const Users = require("../../models/User/index");
// const ProductTest = require("../../models/Products/index");

class cartController {
  index(req, res, next) {
    if (res.data) {
      var userLogin = res.data;
      var isUser = userLogin;
      return res.render("user/carts/carts", {
        userLogin,
        isUser,
      });
    }
  }
}

module.exports = new cartController();
