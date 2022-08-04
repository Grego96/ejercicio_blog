function showLogin(req, res) {
    res.render("login");
}

function showRegister(req, res) {
    res.render("register");
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
    logOutUser
};