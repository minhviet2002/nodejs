const express = require("express");
const router = express.Router();
const categorieController = require("../../../controller/admin/categoriesController");
const isAdminController = require("../../.././config/middleware/isAdminController");
router.post("/more-categorie", categorieController.moreCategoriePost);
router.get(
  "/more-categorie",
  isAdminController.isAdmin,
  categorieController.moreCategorie
);
router.get("/trash", isAdminController.isAdmin, categorieController.trash);
router.patch("/:id/restore", categorieController.restore);
router.put("/:id/update", categorieController.updatePut);
router.get(
  "/:id/update",
  isAdminController.isAdmin,
  categorieController.update
);
router.delete("/:id/delete", categorieController.delete);
router.delete("/:id/delete-force", categorieController.deleteForce);
router.get(
  "/search",
  isAdminController.isAdmin,
  categorieController.searchCategories
);
// router.get("/:slug", userController.slug);
router.get("/", isAdminController.isAdmin, categorieController.index);
module.exports = router;
