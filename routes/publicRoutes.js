const express = require("express");
const publicRouter = express.Router();
const pageController = require("../controllers/pagesController");
const articleController = require("../controllers/articleController");

// showHome

publicRouter.get("/", pageController.showHome);
publicRouter.get("/article/:id", articleController.show);
module.exports = publicRouter;
