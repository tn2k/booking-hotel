'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Room', {
      room_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'product_id'
        }
      },
      room_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      room_detail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      room_rules: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rentail_conditions: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      terms_and_conditions: {
        type: Sequelize.STRING,
        allowNull: false,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Room');
  }
};
