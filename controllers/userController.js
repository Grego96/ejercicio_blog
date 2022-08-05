const { User, Comment, Article } = require("../models");
const formidable = require("formidable");
const path = require("path");

// Show the form for creating a new resource
async function findOrCreateUserAndComment(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  await Comment.create({
    content: req.body.content,
    articleId: req.params.id,
    userId: req.user.id,
  });
  // "#newComment" anclaje al ID del formulario donde se crean comentarios en el articulo
  res.redirect("/article/" + req.params.id + "#newComment");
  /*
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
    await Comment.create({
      content: req.body.content,
      articleId: req.params.id,
      userId: user.id,
    });
  }
  res.redirect("/article/" + req.params.id);
  */
}

async function createArticle(req, res) {
  if (req.isAuthenticated()) {
    res.render("createArticle");
  } else {
    res.redirect("/login");
  }
}

async function addArticle(req, res) {
  if (req.isAuthenticated()) {
    const form = formidable({
      multiples: true,
      uploadDir: path.join(__dirname, "../public/img"),
      keepExtensions: true,
    });

    form.parse(req, async (error, fields, files) => {
      /*
      if (
        typeof fields.firstname === "string" &&
        typeof fields.lastname === "string" &&
        /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(fields.email)
      ) {
        const [user, created] = await User.findOrCreate({
          where: {
            firstname: fields.firstname,
            lastname: fields.lastname,
            email: fields.email,
          },
          defaults: {
            firstname: fields.firstname,
            lastname: fields.lastname,
            email: fields.email,
          },
        });
        if (created) {
          console.log("se creo un usuario nuevo");
        } else {
          console.log("usuario existente");
        }
        */
      await Article.create({
        title: fields.title,
        content: fields.content,
        image: files.image.newFilename,
        userId: req.user.id,
      });
      res.redirect("/");
    });
  } else {
    res.redirect("/login");
  }
}

// Otros handlers...
// ...

module.exports = {
  findOrCreateUserAndComment,
  createArticle,
  addArticle,
};
