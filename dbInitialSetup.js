const db = require("./models");

module.exports = async () => {
  // Crear tablas:
  await db.sequelize.sync();
  console.log("[Database] ¡Las tablas fueron creadas!");
  // { force: true }
  // Ejecutar seeders (datos de prueba):
  // await require("./seeders/userSeeders")();
  // await require("./seeders/articleSeeder")();
  // await require("./seeders/commentSeeder")();
  console.log("[Database] ¡Los datos de prueba fueron insertados!");
};
