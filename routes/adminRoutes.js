const express = require("express");
const formidable = require("formidable");
const path = require("path");
const adminRouter = express.Router();
// const adminController = require("../controllers/adminController");
const { User, Article, Comment } = require("../models");
// Rutas del Admin:
// ...
adminRouter.get("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }
  const articles = await Article.findAll({ order: [["createdAt", "DESC"]], include: User });
  res.render("adminMainPage", {
    articles,
  });
});

adminRouter.get("/delete/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }
  if (req.user.id === article.user.id) {
    const article = await Article.findByPk(req.params.id);
    await Article.destroy({
      where: {
        id: req.params.id,
      },
    });
  }
  res.redirect("/admin");
});

adminRouter.get("/article/:id", async (req, res) => {
  const article = await Article.findByPk(req.params.id, {
    include: [User, { model: Comment, as: "comments" }],
  });
  if (article === null) {
    res.status(404).send("Not Found");
  } else {
    if (req.isAuthenticated() && req.user.id === article.user.id) {
      res.render("adminEditArticle", { article });
    }
  }
});

adminRouter.post("/article/:id", express.json(), async (req, res) => {
  const form = formidable({
    multiples: true,
    uploadDir: path.join(__dirname, "../public/img"),
    keepExtensions: true,
  });
  let articleId = req.params.id;
  form.parse(req, async (error, fields, files) => {
    await Article.update(
      { ...fields, image: files.image.newFilename },
      {
        where: { id: articleId },
      },
    );
  });
  res.redirect("/admin");
});

module.exports = adminRouter;
