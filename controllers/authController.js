const { Article, User, Comment } = require("../models");
const passport = require("passport");
const bcrypt = require("bcrypt");

// Display a listing of the resource.
async function index(req, res) { }

// Display the specified resource.
async function show(req, res) { }

// Show the form for creating a new resource
async function create(req, res) { }

// Store a newly created resource in storage.
async function store(req, res) { }

// Show the form for editing the specified resource.
async function edit(req, res) { }

// Update the specified resource in storage.
async function update(req, res) { }

// Remove the specified resource from storage.
async function destroy(req, res) { }

async function loginUser(req, res) {
    // const user= User.findOne({Where: {email:email}})
};

function showLogin(req, res) {
    res.render("login");
}

function showRegister(req, res) {
    res.render("register");
}



/*async function adminUser() {

}
*/
// Otros handlers...
// ...

module.exports = {
    index,
    show,
    create,
    store,
    edit,
    update,
    destroy,
    loginUser,
    showLogin,
    showRegister
};