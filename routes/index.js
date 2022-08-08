const publicRoutes = require("./publicRoutes");
const adminRoutes = require("./adminRoutes");
const apiAdmRoutes = require("./apiAdmRoutes");

module.exports = (app) => {
  app.use(publicRoutes);
  app.use("/admin", adminRoutes);
  app.use( apiAdmRoutes);
};
