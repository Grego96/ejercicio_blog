const { faker } = require("@faker-js/faker");
const { Role } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const role = [];

  for (let i = 0; i < 100; i++) {
    role.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(),
    });
  }

  await Role.bulkCreate(role);
  console.log("[Database] Se corrió el seeder de Articles.");
};