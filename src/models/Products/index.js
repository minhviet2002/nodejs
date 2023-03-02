const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require("mongoose-delete");
// ProductsSchema
const ProductsSchema = new Schema(
  {
    title: String,
    description: String,
    categorie: String,
    image: String,
    originalPrice: Number,
    salePrice: Number,
    isPromotion: Boolean,
    promotionPercent: Number,
    isFreeShip: Boolean,
    count: Number,
    color: String,
    size: Number,
  },
  {
    timestamps: true,
  }
);
// add plugin
ProductsSchema.plugin(mongoose_delete, {
  overrideMethods: true,
  deletedAt: true,
});

module.exports = ProductsSchema;
