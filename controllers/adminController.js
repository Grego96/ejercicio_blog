const { User, Article, Comment } = require("../models");

// Display a listing of the resource.
async function homeAdmin(req, res) {
  const articles = await Article.findAll({ order: [["createdAt", "DESC"]], include: User });
  res.render("home", { articles, isAuthenticated: req.isAuthenticated() });
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const article = await Article.findByPk(req.params.id);
  if (!article) {
    res.status(404).send("Not Found");
  } else {
    res.render("adminEdit", { article, isAuthenticated: req.isAuthenticated() });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  console.log(req.params);
  const chosenArticle = await Article.findByPk(req.params.id);
  console.log(chosenArticle);
  await User.update(
    { ...req.body },
    {
      where: { ...chosenArticle },
    },
  );
  res.end(chosenArticle);
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const chosenArticle = await Article.findByPk(req.params.id, {
    include: [User, { model: Comment, as: "comments" }],
  });
  await User.destroy({
    where: {
      ...chosenArticle,
    },
  });
}

// // Otros handlers...
// // ...

module.exports = {
  homeAdmin,
  // show,
  // create,
  // store,
  // edit,
  // update,
  // destroy,
};
