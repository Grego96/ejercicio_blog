module.exports = (sequelize, Model, DataTypes) => {
  class Comment extends Model {}

  Comment.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull:false,
        validate:{
          notEmpty:true,
        }
      },
    },
    {
      sequelize,
      modelName: "comment",
    },
  );

  return Comment;
};
