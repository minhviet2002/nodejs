const Users = require("../../models/User/index");
class registerController {
  index(req, res, next) {
    if (!req.cookies.err) {
      res.render("auth/register/register");
    } else {
      var err = req.cookies.err;
      res.render("auth/register/register", { err });
    }
  }
  post(req, res, next) {
    Users.findOne({ username: req.body.username })
      .then((data) => {
        if(data) {
          res.cookie("err", "Tên tài khoản đã tồn tại");
          res.redirect("/register");
        } else {
          Users.create(req.body)
            .then(() => {
              res.cookie("success", "Đăng kí tài khoản thành công");
              res.redirect("/login");
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  }
}

module.exports = new registerController();
