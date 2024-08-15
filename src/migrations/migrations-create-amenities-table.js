'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Amenities', {
      amenity_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      wifi: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      washingMachine: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      shower: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      terrace: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      armoredDoor: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      livingRoom: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      furnished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      lift: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      dishWasher: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      alarm: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      oven: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      freezer: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      cooktop: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      fridge: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      airConditioner: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      tv: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      centralizedHeating: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      equippedKitchen: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      bathtub: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      guestAllowed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      smartTv: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      balcony: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      swimmingPool: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      hairDryer: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('Amenities');
  }
};