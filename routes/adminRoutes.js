const express = require("express");
const adminRouter = express.Router();
// const adminController = require("../controllers/adminController");
const { User, Article, Comment } = require("../models");
// Rutas del Admin:
// ...
adminRouter.get("/", async (req, res) => {
  const articles = await Article.findAll({ include: User });
  res.render("adminMainPage", { articles });
});

adminRouter.get("/delete/:id", async (req, res) => {
  await Article.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect("/admin");
});

adminRouter.get("/article/:id", async (req, res) => {
  const article = await Article.findByPk(req.params.id, {
    include: [User, { model: Comment, as: "comments" }],
  });
  if (article === null) {
    res.status(404).send("Not Found");
  } else {
    res.render("adminEditArticle", { article });
  }
});

adminRouter.post("/article/:id", express.json(), async (req, res) => {
  await Article.update(
    { ...req.body },
    {
      where: { id: req.params.id },
    },
  );
  res.redirect("/admin");
});

module.exports = adminRouter;
