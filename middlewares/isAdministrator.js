const { Role, User } = require("../models");
module.exports = async (req, res, next) => {
    
  const user = await User.findByPk(req.user.id, {
    include: [Role],
  });
  console.log(user.role.code);

  if (user.role.code >= 400) {
      next(); // Para dar paso al siguiente middleware.
  } else {
    res.redirect("/")
  }
};
