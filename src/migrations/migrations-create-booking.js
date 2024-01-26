'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderDate: {
        type: Sequelize.DATE
      },
      address: {
        type: Sequelize.STRING
      },
      roomNumber: {
        type: Sequelize.STRING
      },
      information: {
        type: Sequelize.STRING
      },
      Adults: {
        type: Sequelize.BOOLEAN
      },
      Children: {
        type: Sequelize.BOOLEAN
      },
      note: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      request: {
        type: Sequelize.BOOLEAN
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');
  }
};