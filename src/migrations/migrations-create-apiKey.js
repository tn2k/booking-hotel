'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('apiKeyModels', {
            key: {
                type: Sequelize.STRING,
                primaryKey: true,
                unique: true,
                allowNull: false
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            permissions: {
                type: Sequelize.ENUM('0000', '1111', '2222'),
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
        await queryInterface.dropTable('apiKeyModels');
    }
};
