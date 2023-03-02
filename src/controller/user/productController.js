const Categorie = require("../../models/Categories/index");
const Users = require("../../models/User/index");
const ProductTest = require("../../models/Products/index");

class productController {
  index(req, res, next) {
    if (res.data) {
      Promise.all([
        Categorie.find({}),
        Categorie.findOne({ searchTerm: req.params.categorieSlug }),
      ]).then(([data, categorie]) => {
        var userLogin = res.data;
        var isUser = userLogin;
        var categories = data.map((category) => category.toObject());
        var categorieList = categories;
        var products = [];
        var slugCategorie = categorie.toObject();
        slugCategorie.products.find((data) => {
          products.push(data);
        });
        return res.render("user/products/products", {
          userLogin,
          isUser,
          categories,
          slugCategorie,
          categorieList,
          products,
        });
      });
    }
  }
  itemDetail(req, res, next) {
    if (res.data) {
      Promise.all([
        Categorie.find({}),
        Categorie.findOne({ searchTerm: req.params.categorieSlug }),
      ]).then(([categories, categorie]) => {
        var userLogin = res.data;
        var isUser = userLogin;
        var categories = categories.map((category) => category.toObject());
        var categorieList = categories;
        
        var slugCategorie = categorie.toObject();
        var product = slugCategorie.products.filter((data) => {
          return data._id == req.params.id;
        });
        return res.render("user/products/productDetail", {
          userLogin,
          isUser,
          categories,
          slugCategorie,
          categorieList,
          product,
        });
      });
    }
  }
  addProductToCart(req, res, next){
  }
}

module.exports = new productController();

// SQL DB:  Table, Row, Column, Joins, Primarey key
// MongoDB: Collection, Document, Field, Embedded Document/Linking, Primary Key
