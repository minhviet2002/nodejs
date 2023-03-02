const Categorie = require("../../models/Categories/index");
const Users = require("../../models/User/index");
const jwt = require("jsonwebtoken");
class categorieController {
  //[GET] /admin/categories
  index(req, res) {
    Promise.all([Categorie.find({}), Categorie.countDocumentsDeleted()])
      .then(([data, count]) => {
        if (res.data) {
          var isAdmin = res.data;
          var userLogin = isAdmin;
          var categories = data.map((categorie) => categorie.toObject());
          var categorieList = categories;
          res.render("admin/categories/categories", {
            categories,
            categorieList,
            count,
            isAdmin,
            userLogin,
          });
        } else {
          res.cookie("err", "Không có quyền quản lí");
          res.redirect("/login");
          res.clearCookie("err");
        }
      })
      .catch((err) => next(err));
  }
  // [GET] admmin/more-user/:slug
  slug(req, res) {
    return res.send("User Slug Page");
  }
  // [GET] admin/more-user/
  moreCategorie(req, res) {
    if (res.data) {
      Categorie.find({})
        .then((data) => {
          var categories = data.map((categorie) => categorie.toObject());
          var categorieList = categories;
          var isAdmin = res.data;
          var userLogin = isAdmin;
          res.render("/admin/categories/more-categories", {
            isAdmin,
            userLogin,
            categorieList,
          });
        })
        .catch((err) => next(err));
    }
  }
  // [POST] admin/more-user/post
  moreCategoriePost(req, res, next) {
    Categorie.create(req.body)
      .then(() => res.redirect("/admin/categories"))
      .catch((err) => next(err));
  }
  // [GET] /users/:id/update
  update(req, res, next) {
    Categorie.findById(req.params.id)
      .then((data) => {
        if (res.data) {
          var isAdmin = res.data;
          var userLogin = isAdmin;
          var categories = data.toObject();
          res.render("admin/categories/update-categories", {
            categories,
            isAdmin,
            userLogin,
          });
        }
      })
      .catch((err) => next(err));
  }
  // [PUT] /users/:id/update/put
  updatePut(req, res, next) {
    Categorie.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/admin/categories"))
      .catch((err) => next(err));
  }
  // [DELETE] /users/:id/delete
  delete(req, res, next) {
    Categorie.delete({ _id: req.params.id })
      .then(() => res.redirect("/admin/categories"))
      .catch((err) => next(err));
  }
  // [GET] /users/trash
  trash(req, res, next) {
    Promise.all([Categorie.findDeleted({}), Categorie.find({})])
      .then(([dataDeleted, data]) => {
        if (res.data) {
          var isAdmin = res.data;
          var userLogin = isAdmin;
          var categories = dataDeleted.map((categorie) => categorie.toObject());
          var categorieList = data.map((categorie) => categorie.toObject());
          res.render("admin/categories/trash-categories", {
            categories,
            categorieList,
            isAdmin,
            userLogin,
          });
        }
      })
      .catch((err) => next(err));
  }
  restore(req, res, next) {
    Categorie.restore({ _id: req.params.id })
      .then((data) => {
        res.redirect("/admin/categories/trash");
      })
      .catch((err) => next(err));
  }
  deleteForce(req, res, next) {
    Categorie.deleteOne({ _id: req.params.id })
      .then((data) => {
        res.redirect("/admin/categories/trash");
      })
      .catch((err) => next(err));
  }
  searchCategories(req, res) {
    Promise.all([
      Categorie.find({
        searchTerm: { $regex: ".*" + req.query.search + ".*" },
      }),
      Categorie.countDocumentsDeleted(),
    ])
      .then(([data, count]) => {
        if (res.data) {
          var isAdmin = res.data;
          var searchKeyword = req.query.search;
          var categories = data.map((categorie) => categorie.toObject());
          res.render("admin/categories/categories", {
            categories,
            count,
            isAdmin,
            searchKeyword,
          });
        }
      })
      .catch((err) => next(err));
  }
}

module.exports = new categorieController();

// SQL DB:  Table, Row, Column, Joins, Primarey key
// MongoDB: Collection, Document, Field, Embedded Document/Linking, Primary Key
