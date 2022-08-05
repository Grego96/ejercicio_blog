module.exports = (sequelize, Model, DataTypes) => {
    class Role extends Model {}
  
    Role.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull:false,
          validate:{
            notEmpty:true,
          }
        },
      },
      {
        sequelize,
        modelName: "role",
      },
    );
  
    return Comment;
  };