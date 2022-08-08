const formidable = require("formidable");
const path = require("path");
const { User, Article, Comment } = require("../models");
const { format } = require("date-fns");

async function showEditPage(req, res) {
  const articles = await Article.findAll({ order: [["createdAt", "DESC"]], include: User });
  res.render("adminMainPage", { articles, isAuthenticated: req.isAuthenticated() });
}

async function getEditArticleForm(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: [User, { model: Comment, as: "comments" }],
  });
  if (!article) {
    res.status(404).send("Not Found");
  } else {
    res.render("adminEditArticle", { article, isAuthenticated: req.isAuthenticated() });
  }
}

async function updateArticleInfo(req, res) {
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
}

async function destroyArticle(req, res) {
  const article = await Article.findOne({ where: { id: req.params.id }, include: User });
  await Article.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect("/admin");
}

module.exports = {
  showEditPage,
  getEditArticleForm,
  updateArticleInfo,
  destroyArticle,
};
