const { Article, User } = require("../models");

async function showHome(req, res) {
  const articles = await Article.findAll({ order: [['createdAt', 'DESC']], include: User });
  res.render("home", { articles });
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
