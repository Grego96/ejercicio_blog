const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User, Role } = require("../models");

passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        const user = await User.findOne({ where: { email: email } }, { raw: true });
  
        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        const compare = await bcrypt.compare(password, user.password);
  
        if (!compare) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        return done(null, user);
      },
    ),
  );
  
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function (id, done) {
    const user = await User.findByPk(id, {
      include: Role
    })
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, user);
      });
  });