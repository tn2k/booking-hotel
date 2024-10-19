'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      tenant_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
        validate: {
          len: [1, 150]
        }
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
        validate: {
          len: [1, 150]
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
      },
      role: {
        type: Sequelize.ENUM('landlord', 'tenant', 'admin'),
        defaultValue: 'tenant'
      },
      sex: {
        type: Sequelize.ENUM('Male', 'Female', 'Other'),
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'inactive'
      },
      verify: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }



    });
  },
  // timestamps: true,
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
