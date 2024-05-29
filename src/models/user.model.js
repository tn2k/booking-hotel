"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phonenumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"), // Xác định rõ các giá trị ENUM cho gender
        allowNull: false
      },
      roleId: {
        type: DataTypes.ENUM("Admin", "User", "Tenant"), // Xác định rõ các giá trị ENUM cho roleId
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

