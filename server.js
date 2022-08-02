require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();
const { User, Article, Comment } = require("./models");

app.use(session({ secret: "AlgúnTextoSuperSecreto", resave: false, saveUninitialized: false }));
app.use(passport.session());
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      const user = await User.findOne({ where: { email: email } }, { raw: true });

      if (user) {
        const compare = await bcrypt.compare(password, user.password);
        
        if(compare){
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect email or password." });
        }
      } else {
        return done(null, false, { message: "Incorrect email or password." });
      }

      /*if (user.password === password) {

        return done(null, user);
      }

      return done(null, false, { message: "Incorrect email or password." });*/
    }),
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  const user = await User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, user);
    });
});

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

routes(app);

dbInitialSetup(); // Crea tablas e inserta datos de prueba.

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
