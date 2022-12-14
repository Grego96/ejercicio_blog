const express = require("express");
const publicRouter = express.Router();
const pageController = require("../controllers/pagesController");
const articleController = require("../controllers/articleController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const passport = require("passport");
const { User, Article, Comment } = require("../models");

// showHome
publicRouter.get("/", pageController.showHome);
publicRouter.get("/article/:id", articleController.show);
publicRouter.get("/api/article/:id", articleController.api);
publicRouter.post("/article/:id", express.json(), userController.findOrCreateUserAndComment);
publicRouter.get("/create", express.json(), userController.createArticle);
publicRouter.post("/create", express.json(), userController.addArticle);

function login(req, res) {
  passport.authenticate("local", {
    successRedirect: req.session.redirectTo ? req.session.redirectTo : "/",
    failureRedirect: "/login",
  })(req, res);
}

publicRouter.post("/login", login);
//publicRouter.post("/register", authController.adminUser);
publicRouter.get("/login", authController.showLogin);

//Registrar user nuevo, si ya existe dirige directo a el login
publicRouter.post("/register", async (req, res) => {
  const user = await User.findOne({
    where: { email: req.body.email },
  });
  if (!user) {
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });
    res.redirect("/login");
    
  }
  if (user) {
    res.render("register", {user});
  }
});

publicRouter.get("/register", authController.showRegister);

publicRouter.get("/logout", authController.logOutUser);

module.exports = publicRouter;
