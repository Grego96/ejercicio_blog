const { Role } = require("../models");


module.exports = async () => {
  const roles = [
    {
      name: "Lector",
      code: 100
    },
    {
      name: "Escritor",
      code: 200
    },
    {
      name: "Editor",
      code: 300
    },
    {
      name: "Administrador",
      code: 400
    },
  ];

  await Role.bulkCreate(roles);
  console.log("[Database] Se corrió el seeder de Roles.");
};
