'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product', {
      product_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_thumb: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      product_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      product_type: {
        type: Sequelize.ENUM('Room', 'House'),
        allowNull: false,
      },
      product_size: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      product_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_attributes: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable('Product');
  }
};
