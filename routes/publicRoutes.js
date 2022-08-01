const express = require("express");
const publicRouter = express.Router();
const pageController = require("../controllers/pagesController");
const articleController = require("../controllers/articleController");
const userController = require("../controllers/userController");

// showHome

publicRouter.get("/", pageController.showHome);
publicRouter.get("/article/:id", articleController.show);
publicRouter.get("/api/article/:id", articleController.api);
publicRouter.post("/article/:id", express.json(), userController.findOrCreateUserAndComment);
publicRouter.get("/create", express.json(), userController.createArticle);
publicRouter.post("/create", express.json(), userController.addArticle);
module.exports = publicRouter;
