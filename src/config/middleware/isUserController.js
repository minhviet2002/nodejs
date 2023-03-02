const jwt = require("jsonwebtoken");
const Users = require("../.././models/User/index");
const Categorie = require("../.././models/Categories/index");
const storage = require("node-persist");
class isUserController {
  isUser(req, res, next) {
    try {
      storage
        .getItem("token")
        .then((token) => {
          if (token) {
            var data = jwt.verify(token, "pw");
            Users.findById(data._id)
              .then((data) => {
                if (data) {
                  var user = data.toObject();
                  if (user) {
                    if (user.role == 0) {
                      res.data = user;
                      next();
                    } else {
                      res.cookie(
                        "err",
                        "Tài khoản của bạn không phải tài khoản người dùng"
                      );
                      // storage.removeItem("token");
                      res.redirect("/login");
                      res.clearCookie("err");
                    }
                  }
                } else {
                  res.cookie("err", "Tài khoản không tồn tại!");
                  res.redirect("/login");
                }
              })
              .catch((err) => next(err));
          } else {
            Promise.all([Categorie.find({})]).then(([data]) => {
              var categories = data.map((category) => category.toObject());
              var categorieList = categories;
              var products = [];
              categories.find((category) => {
                category.products.find((data) => {
                  products.push(data);
                });
              });
              return res.render("home", {
                categories,
                categorieList,
                products,
              });
            });
          }
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new isUserController();
