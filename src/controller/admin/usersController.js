const Users = require("../../models/User/index");
const Categorie = require("../../models/Categories/index");
class userController {
  //[GET] admin/users
  index(req, res) {
    Promise.all([
      Users.find({ role: 0 }),
      Categorie.find({}),
      Users.countDocumentsDeleted(),
    ])
      .then(([data, categories, count]) => {
        if (res.data) {
          var isAdmin = res.data;
          var userLogin = isAdmin;
          var users = data.map((user) => user.toObject());
          var categorieList = categories.map((categorie) =>
            categorie.toObject()
          );
          res.render("admin/users/users", {
            users,
            count,
            isAdmin,
            userLogin,
            categorieList,
          });
        }
      })
      .catch((err) => next(err));
  }
  // [GET] admmin/more-user/:slug
  slug(req, res) {
    return res.send("User Slug Page");
  }
  // [GET] admin/more-user/
  moreUser(req, res) {
    if (res.data) {
      Categorie.find({})
        .then((data) => {
          var categories = data.map((categorie) => categorie.toObject());
          var categorieList = categories;
          var isAdmin = res.data;
          var userLogin = isAdmin;
          res.render("admin/users/more-user", { isAdmin, userLogin, categorieList });
        })
        .catch((err) => next(err));
    }
  }
  // [POST] admin/more-user/post
  moreUserPost(req, res, next) {
    Users.create(req.body)
      .then(() => res.redirect("/admin/users"))
      .catch((err) => next(err));
  }
  // [GET] /users/:id/update
  update(req, res, next) {
    Users.findById(req.params.id)
      .then((data) => {
        if (res.data) {
          var isAdmin = res.data;
          var userLogin = isAdmin;
          var user = data.toObject();
          res.render("admin/users/update-user", { user, isAdmin, userLogin });
        }
      })
      .catch((err) => next(err));
  }
  // [PUT] /users/:id/update/put
  updatePut(req, res, next) {
    Users.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/admin/users"))
      .catch((err) => next(err));
  }
  // [DELETE] /users/:id/delete
  delete(req, res, next) {
    Users.delete({ _id: req.params.id })
      .then(() => res.redirect("/admin/users"))
      .catch((err) => next(err));
  }
  // [GET] /users/trash
  trash(req, res, next) {
    Users.findDeleted({})
      .then((data) => {
        if (res.data) {
          var isAdmin = res.data;
          var userLogin = isAdmin;
          var users = data.map((user) => user.toObject());
          res.render("admin/users/trash-user", { users, isAdmin, userLogin });
        }
      })
      .catch((err) => next(err));
  }
  restore(req, res, next) {
    Users.restore({ _id: req.params.id })
      .then((data) => {
        res.redirect("/admin/users/trash");
      })
      .catch((err) => next(err));
  }
  deleteForce(req, res, next) {
    Users.deleteOne({ _id: req.params.id })
      .then((data) => {
        res.redirect("/admin/users/trash");
      })
      .catch((err) => next(err));
  }
  searchUsers(req, res) {
    Promise.all([
      Users.find({
        role: 0,
        username: { $regex: ".*" + req.query.search + ".*" },
      }),
      Users.countDocumentsDeleted(),
    ])
      .then(([data, count]) => {
        if (res.data) {
          var isAdmin = res.data;
          var searchKeyword = req.query.search;
          var users = data.map((user) => user.toObject());
          res.render("admin/users/users", { users, count, isAdmin, searchKeyword });
        }
      })
      .catch((err) => next(err));
  }
}

module.exports = new userController();

// SQL DB:  Table, Row, Column, Joins, Primarey key
// MongoDB: Collection, Document, Field, Embedded Document/Linking, Primary Key
