const express = require("express");
const publicRouter = express.Router();
const pageController = require("../controllers/pagesController");
const articleController = require("../controllers/articleController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const isAuthenticated = require("../middlewares/isAuthenticated")

publicRouter.get("/", pageController.showHome);
publicRouter.get("/article/:id", articleController.showSingleArticle);
publicRouter.get("/create", articleController.getCreateArticleForm);
publicRouter.post("/create", express.json(), isAuthenticated, articleController.createArticle);
publicRouter.post("/article/:id", express.json(), isAuthenticated, userController.createComment);
publicRouter.post("/login", authController.login);
publicRouter.get("/login", authController.showLogin);
publicRouter.post("/register", userController.createUser);
publicRouter.get("/register", authController.showRegister);
publicRouter.get("/logout", authController.logOutUser);

module.exports = publicRouter;
