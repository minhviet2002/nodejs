const Users = require("../../models/User/index");
const jwt = require("jsonwebtoken");
const storage = require("node-persist");
class loginController {
  //[GET] /login
  index(req, res) {
    if (!req.cookies.err) {
      if (req.cookies.success) {
        var success = req.cookies.success;
        res.render("auth/login/login", { success });
        res.clearCookie("success");
      } else {
        res.render("auth/login/login");
      }
    } else {
      var err = req.cookies.err;
      res.render("auth/login/login", { err });
      res.clearCookie("err");
    }
  }
  post(req, res, next) {
    Users.findOne({ username: req.body.username, password: req.body.password })
      .then((data) => {
        if (data) {
          if (data.role == 1) {
            var token = jwt.sign({ _id: data._id }, "pw");
            storage.setItem("token", token);
            res.clearCookie("err");
            res.redirect("/admin/users");
          } else {
            var token = jwt.sign({ _id: data._id }, "pw");
            storage.setItem("token", token);
            res.clearCookie("err");
            res.redirect("/");
          }
        } else {
          res.cookie("err", "Tài khoản hoặc mật khẩu không chính xác");
          res.redirect("/login");
        }
      })
      .catch((err) => next(err));
  }
}
module.exports = new loginController();

// SQL DB:  Table, Row, Column, Joins, Primarey key
// MongoDB: Collection, Document, Field, Embedded Document/Linking, Primary Key
