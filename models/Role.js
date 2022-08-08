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
        code: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull:false,
          validate:{
            notEmpty:true,
          }
        }
      },
      {
        sequelize,
        modelName: "role",
      },
    );
  
    return Role;
  };