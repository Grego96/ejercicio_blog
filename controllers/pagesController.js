const { Article, User } = require("../models");
const { format } = require("date-fns");

async function showHome(req, res) {
  const articles = await Article.findAll({
    order: [["createdAt", "DESC"]],
    include: User,
  });
  res.render("home", { articles, format, isAuthenticated: req.isAuthenticated() });
}

async function showContact(req, res) {
  res.render("article");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

module.exports = {
  showHome,
  showContact,
  showAboutUs,
};
