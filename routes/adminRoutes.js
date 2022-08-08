const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController")
const isAuthor = require("../middlewares/isAuthor")
const isAuthenticated = require("../middlewares/isAuthenticated")

adminRouter.get("/", isAuthenticated, adminController.showEditPage);
adminRouter.get("/:id", isAuthor, adminController.destroyArticle);
adminRouter.get("/article/:id", adminController.getEditArticleForm);
adminRouter.post("/article/:id", express.json(), adminController.updateArticleInfo);

module.exports = adminRouter;
