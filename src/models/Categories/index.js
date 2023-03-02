const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require("mongoose-delete");
const slug = require("mongoose-slug-generator");
const ProductsSchema = require(".././Products/index");
mongoose.plugin(slug);
// ProductsSchema
// const ProductsSchema = new Schema(
//   {
//     title: String,
//     description: String,
//     category: String,
//     image: String,
//     originalPrice: Number,
//     salePrice: Number,
//     isPromotion: Boolean,
//     promotionPercent: Number,
//     isFreeShip: Boolean,
//     color: String,
//     size: Number,
//   },
//   {
//     timestamps: true,
//   }
// );

// CategoriesSchema
const CategoriesSchema = new Schema(
  {
    name: String,
    searchTerm: String,
    products: [ProductsSchema],
    slug: { type: String, slug: "searchTerm" },
  },
  {
    timestamps: true,
  }
);
// add plugin
CategoriesSchema.plugin(mongoose_delete, {
  overrideMethods: true,
  deletedAt: true,
});

module.exports = mongoose.model("categorie", CategoriesSchema);
