const { Article, User, Comment } = require("../models");

// Display a listing of the resource.
async function api(req, res) {
  const apiArticle = await Article.findByPk(req.params.id, {
    include: [User, { model: Comment, as: "comments" }],
  });
  if (apiArticle === null) {
    res.status(404).send("Not Found");
  } else {
    res.json(apiArticle);
  }
}

// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: [User, { model: Comment, as: "comments" }],
  });
  if (article === null) {
    res.status(404).send("Not Found");
  } else {
    res.render("contact", { article });
  }
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  api,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
