const express = require("express");
const publicRouter = express.Router();
const pageController = require("../controllers/pagesController")

// showHome

publicRouter.get("/", pageController.showHome)

module.exports = publicRouter;
