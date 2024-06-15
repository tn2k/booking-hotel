'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model { }
  Users.init({
    tenant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        len: [1, 150]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true
    },
    phone: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.ENUM('landlord', 'tenant', 'admin'),
      defaultValue: 'tenant'
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'inactive'
    },
    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Users'
  });

  Users.associate = (models) => {
    Users.hasMany(models.Rental, { foreignKey: 'tenant_id' });
    Users.hasMany(models.Room, { foreignKey: 'tenant_id' });
    Users.hasMany(models.RoomReview, { foreignKey: 'user_id' });
  };
  return Users;
}