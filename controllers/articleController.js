const { Article, User, Comment } = require("../models");
const { format } = require("date-fns");

async function api(req, res) {
  const apiArticle = await Article.findByPk(req.params.id, {
    include: [User, { model: Comment, as: "comments" }],
  });
  if (!apiArticle) {
    res.status(404).send("Not Found");
  } else {
    res.json(apiArticle);
  }
}

async function getCreateArticleForm(req, res) {
  if (req.isAuthenticated()) {
    res.render("createArticle");
  } else {
    res.redirect("/login");
  }
}

async function showSingleArticle(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: [User, { model: Comment, include: User }],
    order: [[Comment, "createdAt", "DESC"]],
  });
  if (!article) {
    res.status(404).send("Not Found");
  } else {
    res.render("article", { article, format, isAuthenticated: req.isAuthenticated() });
  }
}

async function createArticle(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: path.join(__dirname, "../public/img"),
    keepExtensions: true,
  });
  form.parse(req, async (error, fields, files) => {
    await Article.create({
      title: fields.title,
      content: fields.content,
      image: files.image.newFilename,
      userId: req.user.id,
    });
    res.redirect("/");
  });
}

module.exports = {
  getCreateArticleForm,
  showSingleArticle,
  createArticle,
};
