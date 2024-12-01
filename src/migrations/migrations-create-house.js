'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Houses', {
      house_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      product_user: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      product_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_detail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_rules: {
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
    await queryInterface.dropTable('Houses');
  }
};
