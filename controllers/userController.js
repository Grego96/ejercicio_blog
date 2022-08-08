const { Comment} = require("../models");

async function createUser(req, res) {
  const [user, created] = await User.findOrCreate({
    where: {
      username: req.body.username,
      email: req.body.email,
    },
    defaults: {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    },
  });
  if (created) {
    res.redirect("/login");
  } else {
    res.redirect("/login");
  }
}

async function createComment(req, res) {
  // if (!req.isAuthenticated()) {
  //   return res.redirect("/login"); 
  // }
  await Comment.create({
    content: req.body.content,
    articleId: req.params.id,
    userId: req.user.id,  
  });
  res.redirect("/article/" + req.params.id);
}

module.exports = {
  createUser,
  createComment
};
