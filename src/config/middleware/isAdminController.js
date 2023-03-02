const jwt = require("jsonwebtoken");
const Users = require("../.././models/User/index");
const storage = require("node-persist");
class isAdminController {
  isAdmin(req, res, next) {
    try {
      // if (storage.getItem("token")) {
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
                    if (user.role == 1) {
                      res.data = user;
                      next();
                    } else {
                      res.cookie(
                        "err",
                        "Tài khoản của bạn không có quyền quản lí"
                      );
                      storage.removeItem("token");
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
            res.cookie("err", "Bạn chưa đăng nhập!");
            res.redirect("/login");
          }
        })
        .catch((err) => next(err));
      // } else {
      //   res.cookie("err", "Bạn chưa đăng nhập!");
      //   res.redirect("/login");
      // }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new isAdminController();
