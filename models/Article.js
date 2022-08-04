module.exports = (sequelize, Model, DataTypes) => {
  class Article extends Model { }

  Article.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
           notEmpty: true,
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
           notEmpty: true,
        }
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
           notEmpty: true,
        }
      },
    },
    {
      sequelize,
      modelName: "article",
    },
  );

  return Article;
};
