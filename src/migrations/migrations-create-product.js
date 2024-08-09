'use strict';

const slugify = require('slugify');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      product_user: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
      product_ratingsAverage: {
        type: Sequelize.FLOAT,
        defaultValue: 4.5,
        validate: {
          min: {
            args: [1],
            msg: "Rating must be above 1.0"
          },
          max: {
            args: [5],
            msg: "Rating must be below 5.0"
          }
        },
      },
      product_variations: {
        type: Sequelize.JSON,
        defaultValue: []
      },
      isDraft: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      product_attributes: {
        type: Sequelize.JSON,
        allowNull: false
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
    await queryInterface.dropTable('Products');
  }
};
