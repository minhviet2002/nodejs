const express = require("express");
const router = express.Router();
const userController = require("../../../controller/admin/usersController");
const isAdminController = require("../../.././config/middleware/isAdminController");
router.post("/more-user/post", userController.moreUserPost);
router.get("/more-user", isAdminController.isAdmin, userController.moreUser);
router.get("/trash", isAdminController.isAdmin, userController.trash);
router.patch("/:id/restore", userController.restore);
router.put("/:id/update/put", userController.updatePut);
router.get("/:id/update",  isAdminController.isAdmin, userController.update);
router.delete("/:id/delete", userController.delete);
router.delete("/:id/delete-force", userController.deleteForce);
router.post("/:id/delete-force", userController.deleteForce);
router.get(
  "/search",
  isAdminController.isAdmin,
  userController.searchUsers
);
router.get("/:slug", userController.slug);
router.get("/", isAdminController.isAdmin, userController.index);
module.exports = router;
