const express = require("express");
const router = express.Router();
const productController = require("../../../controller/admin/productsController");
const isAdminController = require("../../.././config/middleware/isAdminController");
router.post("/more-product", productController.moreProductPost);
router.get(
  "/more-product",
  isAdminController.isAdmin,
  productController.moreProduct
);
router.get("/:categorieSlug/trash", isAdminController.isAdmin, productController.trash);
router.patch("/:categorieSlug/:id/restore",  productController.restore);
router.put("/:categorieSlug/:id/update",  productController.updatePut);
router.get(
  "/:categorieSlug/:id/update",
  isAdminController.isAdmin,
  productController.update
);
router.delete("/:categorieSlug/:id/delete", productController.delete);
router.delete("/:categorieSlug/:id/delete-force", productController.deleteForce);
// router.get("/search", isAdminController.isAdmin, categorieController.searchCategories);
// router.get("/:slug", userController.slug);
router.get(
  "/:categorieSlug",
  isAdminController.isAdmin,
  productController.index
);
module.exports = router;
