const { Role, User } = require("../models");
module.exports = async (req, res, next) => {
    
  const user = await User.findByPk(req.user.id, {
    include: [Role],
  });
  console.log(user.role.code);
  // console.log("Soy un middlewares");
  next(); // Para dar paso al siguiente middleware.
};
