const { Article, User, Comment } = require("../models");
const { format } = require("date-fns");

async function showHome(req, res) {
  const articles = await Article.findAll({
    order: [["createdAt", "DESC"]],
    include: User,
  });
  res.render("home", { articles, format });
}

async function showContact(req, res) {
  res.render("article");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showContact,
  showAboutUs,
};
