const { User, Comment, Article } = require("../models");

// Show the form for creating a new resource
async function findOrCreateUserAndComment(req, res) {
  if (
    typeof req.body.firstname === "string" &&
    typeof req.body.lastname === "string" &&
    /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(req.body.email)
  ) {
    const [user, created] = await User.findOrCreate({
      where: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
      },
      defaults: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
      },
    });

    if (created) {
      console.log("se creo un usuario nuevo");
    } else {
      console.log("usuario existente");
    }
    const comment = await Comment.create({
      content: req.body.content,
      articleId: req.params.id,
      userId: user.id,
    });
  }
}

async function createArticle(req, res) {
  res.render("createArticle");
}

async function addArticle(req, res) {
  if (
    typeof req.body.firstname === "string" &&
    typeof req.body.lastname === "string" &&
    /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(req.body.email)
  ) {
    const [user, created] = await User.findOrCreate({
      where: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
      },
      defaults: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
      },
    });

    if (created) {
      console.log("se creo un usuario nuevo");
    } else {
      console.log("usuario existente");
    }
    await Article.create({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      userId: user.id,
    });
  }
  res.redirect("/");
}

// Otros handlers...
// ...

module.exports = {
  findOrCreateUserAndComment,
  createArticle,
  addArticle,
};
