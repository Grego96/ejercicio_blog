const passport = require("passport");

function showLogin(req, res) {
    if (!req.isAuthenticated()) {
        return res.render("login");
    }
    res.redirect("/");
}

function showRegister(req, res) {
    if (!req.isAuthenticated()) {
        return res.render("register");
    }
    res.redirect("/");
}

function login(req, res) {
    passport.authenticate("local", {
      successRedirect: req.session.redirectTo ? req.session.redirectTo : "/",
      failureRedirect: "/login",
    })(req, res);
  }

function logOutUser(req, res) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");

    });
}

module.exports = {
    showLogin,
    showRegister,
    login,
    logOutUser
};