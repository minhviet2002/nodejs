const Categorie = require("../../models/Categories/index");
const Users = require("../../models/User/index");
const ProductTest = require("../../models/Products/index");

class categorieController {
  //[GET] admin/:category/product
  index(req, res) {
    Promise.all([
      Categorie.find({}),
      Categorie.findOne({ searchTerm: req.params.categorieSlug }),
      Categorie.countDocumentsDeleted(),
    ])
      .then(([data, categorie, count]) => {
        if (res.data) {
          let countDeleted = 0;
          var isAdmin = res.data;
          var userLogin = isAdmin;
          var productsArr = categorie.products.map((data) => data.toObject());
          var products = productsArr.filter((product) => {
            if (product.deleted == false) {
              return product;
            } else {
              countDeleted++;
            }
          });
          var categories = data.map((categorie) => categorie.toObject());
          var categorieList = categories;
          var slugCategorie = categorie.toObject();
          res.render("admin/products/products", {
            categories,
            countDeleted,
            slugCategorie,
            categorieList,
            products,
            count,
            isAdmin,
            userLogin,
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
  moreProduct(req, res) {
    if (res.data) {
      Categorie.find({})
        .then((data) => {
          var categories = data.map((category) => category.toObject());
          var categorieList = categories;
          var isAdmin = res.data;
          var userLogin = isAdmin;
          res.render("admin/products/more-products", {
            categories,
            categorieList,
            isAdmin,
            userLogin,
          });
        })
        .catch((err) => {
          next(err);
        });
    }
  }
  // [POST] admin/more-user/post
  moreProductPost(req, res, next) {
    Categorie.findOne({ searchTerm: req.body.categorie })
      .then((data) => {
        var moreProduct = [...data.products, req.body];
        Categorie.findOneAndUpdate(
          { searchTerm: req.body.categorie },
          { products: moreProduct }
        )
          .then((data) => {
            if (data) {
              res.redirect("/admin/products/more-product");
            }
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  }
  // [GET] /users/:id/update
  update(req, res, next) {
    Promise.all([Categorie.findOne({ searchTerm: req.params.categorieSlug })])
      .then(([categorie]) => {
        // console.log('Model: ', Categorie);
        if (res.data) {
          var isAdmin = res.data;
          var userLogin = isAdmin;
          var productList = categorie.products;
          var item = productList.find((product) => {
            if (product._id == req.params.id) return product;
          });
          var categorie = categorie.toObject();
          var product = item.toObject();
          res.render("admin/products/update-products", {
            product,
            isAdmin,
            userLogin,
            categorie,
          });
        }
      })
      .catch((err) => next(err));
  }
  // [PUT] /users/:id/update/put
  updatePut(req, res, next) {
    Categorie.findOne({ searchTerm: req.params.categorieSlug })
      .then((categorie) => {
        var productList = categorie.products.map((product) =>
          product.toObject()
        );
        var id;
        var item = categorie.products
          .find((product, index) => {
            if (product._id == req.params.id) {
              id = index;
              return product;
            }
          })
          .toObject();
        var newProduct = { ...item, ...req.body };
        productList.splice(id, 1, newProduct);
        Categorie.findOneAndUpdate(
          { searchTerm: req.params.categorieSlug },
          { products: productList }
        )
          .then((data) => {
            if (data) {
              var path = "/admin/products/" + req.body.categorie;
              res.redirect(path);
            }
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => next(err));
  }
  // [DELETE] /users/:id/delete
  delete(req, res, next) {
    Categorie.findOne({ searchTerm: req.params.categorieSlug })
      .then((categorie) => {
        var productsArr = categorie.products.map((data) => data.toObject());
        var product = productsArr.filter((product) => {
          if (product._id == req.params.id) {
            product.deleted = true;
            return product;
          }
        });
        var newProductList = productsArr;
        Categorie.findOneAndUpdate(
          { searchTerm: req.params.categorieSlug },
          { products: newProductList }
        )
          .then((data) => {
            if (data) {
              var path = "/admin/products/" + req.params.categorieSlug;
              res.redirect(path);
            }
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => next(err));
  }
  // [GET] /users/trash
  trash(req, res, next) {
    Promise.all([
      Categorie.find({}),
      Categorie.findOne({ searchTerm: req.params.categorieSlug }),
    ])
      .then(([data, categorie]) => {
        if (res.data) {
          var productsArr = categorie.products.map((data) => data.toObject());
          var products = productsArr.filter((product) => {
            return product.deleted == true;
          });
          var isAdmin = res.data;
          var userLogin = isAdmin;
          var categorieList = data.map((categorie) => categorie.toObject());
          var categorie = categorie.toObject();
          res.render("admin/products/trash-products", {
            categorieList,
            categorie,
            products,
            isAdmin,
            userLogin,
          });
        }
      })
      .catch((err) => next(err));
  }
  restore(req, res, next) {
    Categorie.findOne({ searchTerm: req.params.categorieSlug })
      .then((categorie) => {
        var productsArr = categorie.products.map((data) => data.toObject());
        var product = productsArr.filter((product) => {
          if (product._id == req.params.id) {
            product.deleted = false;
            return product;
          }
        });
        var newProductList = productsArr;
        Categorie.findOneAndUpdate(
          { searchTerm: req.params.categorieSlug },
          { products: newProductList }
        )
          .then((data) => {
            if (data) {
              var path =
                "/admin/products/" + req.params.categorieSlug + "/trash";
              res.redirect(path);
            }
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => next(err));
  }
  deleteForce(req, res, next) {
    Categorie.findOne({ searchTerm: req.params.categorieSlug })
      .then((categorie) => {
        var productList = categorie.products.map((product) =>
          product.toObject()
        );
        var id;
        categorie.products.find((product, index) => {
          if (product._id == req.params.id) {
            return productList.splice(index, 1);
          }
        });
        Categorie.findOneAndUpdate(
          { searchTerm: req.params.categorieSlug },
          { products: productList }
        )
          .then((data) => {
            if (data) {
              var path =
                "/admin/products/" + req.params.categorieSlug + "/trash";
              res.redirect(path);
            }
          })
          .catch((err) => {
            next(err);
          });
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
