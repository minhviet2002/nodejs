const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require("mongoose-delete");
const User = new Schema(
  {
    name: String,
    username: String,
    password: String,
    role: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
// add plugin
User.plugin(mongoose_delete, {
  overrideMethods: true,
  deletedAt: true,
});
module.exports = mongoose.model("user", User);
