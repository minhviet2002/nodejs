  const storage = require("node-persist");
class logoutController {
  post(req, res, next) {
    req.session.destroy();
    storage.removeItem('token');
    res.redirect("/login");
  }
}

module.exports = new logoutController();
