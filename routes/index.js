const publicRoutes = require("./publicRoutes");
const adminRoutes = require("./adminRoutes");
const isAuthenticated = require("../middlewares/isAuthenticated");

module.exports = (app) => {
  app.use(publicRoutes);
  app.use("/admin", adminRoutes);
};
