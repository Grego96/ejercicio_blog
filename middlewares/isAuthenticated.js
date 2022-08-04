module.exports = function (req, res, next) {
  if (!req.isAuthenticated()) {
    console.log("ACA -> ", req);
    req.session.redirectTo = req.query.redirectTo;
    return res.redirect("/login");
  }
  return next();
};
